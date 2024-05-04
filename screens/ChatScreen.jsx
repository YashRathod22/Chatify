import { View, Text, TouchableOpacity, StatusBar, KeyboardAvoidingView, ScrollView, ActivityIndicator, TextInput, Platform, Image, Keyboard } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import { Entypo, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { firestoreDb } from '../config/firebase.config';
import EmojiSelector from 'react-native-emoji-selector'

const ChatScreen = ({ route }) => {
    const { room } = route.params;
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState(null)
    const [showEmojiSelector, setShowEmojiSelector] = useState(false)

    const textInputRef = useRef(null)
    const scrollViewRef = useRef(null)
    const user = useSelector((state) => state.user.user);


    // const handleKeyboardOpen = () => {
    //     if (textInputRef.current) {
    //         textInputRef.current.focus()
    //     }
    // }

    const handleEmojiPress = () => {
        setShowEmojiSelector(!showEmojiSelector)
    }

    useEffect(() => {
        updateScrollView()
    }, [messages])


    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true })
        }, 100);
    }

    const sendMessage = async () => {
        const timeStamp = serverTimestamp()
        const id = `${Date.now()}`
        const _doc = {
            _id: id,
            roomId: room._id,
            timeStamp: timeStamp,
            message: message,
            user: user
        }
        setMessage("")
        await addDoc(collection(doc(firestoreDb, "chats", room._id), "messages"), _doc)
            .then(() => { }).catch((err) => { Alert(err) })
    }

    useLayoutEffect(() => {
        const msgQuery = query(
            collection(firestoreDb, "chats", room._id, "messages"),
            orderBy("timeStamp", "asc")
        )

        const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
            const updatedMsg = querySnap.docs.map(doc => doc.data())
            setMessages(updatedMsg)
            setIsLoading(false)
        });

        const KeyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', updateScrollView
        )

        return () => {
            unsubscribe();
            KeyboardDidShowListener.remove();
        }
    }, [])

    return (
        <View className='flex-1'>
            <StatusBar
                hidden={true}
            />
            <View className='w-full bg-primary px-4 py-6 flex-[0.15]'>
                <View className='flex-row items-center justify-between w-full px-4 py-3 '>

                    {/* go back */}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name='chevron-left' size={35} color={'#fbfbfb'} />
                    </TouchableOpacity>
                    {/* middle section */}
                    <View className='flex-row items-center justify-center space-x-3'>
                        <View className='w-12 h-12 rounded-full border border-white flex items-center justify-center'>
                            <FontAwesome5 name="users" size={24} color={'#fbfbfb'} />
                        </View>
                        <View>
                            <Text className='text-base text-gray-50 font-semibold capitalize'>
                                {room.chatName.length > 16 ? `${room.chatName.slice(0, 16)}..` : room.chatName}
                            </Text>
                            <Text className='text-sm text-gray-100 font-semibold capitalize'>
                                Online
                            </Text>
                        </View>
                    </View>
                    {/* last section */}
                    <View className='flex-row items-center justify-center space-x-3'>
                        <TouchableOpacity>
                            <FontAwesome5 name="video" size={23} color={"#fbfbfb"} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome5 name="phone-alt" size={23} color={"#fbfbfb"} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Entypo name="dots-three-vertical" size={23} color={"#fbfbfb"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* bottom section */}
            <View className='w-full bg-white px-4 py-2 rounded-3xl flex-1 rounded-t-[50px] -mt-10'>
                {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : undefined} keyboardVerticalOffset={100}> */}
                <>
                    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
                        {isLoading ? (<>
                            <View className='w-full flex items-center justify-center'>
                                <ActivityIndicator size={'large'} color={'#43c651'} />
                            </View>
                        </>) : (
                            <>
                                {/* messages */}
                                {messages?.map((msg, i) => msg.user.provideData.email === user.provideData.email ? (
                                    <View className='m-2' key={i}>
                                        <Text style={{ alignSelf: "flex-end" }} className='text-base font-semibold text-black'>
                                            {msg.user.fullName}
                                        </Text>
                                        <View style={{ alignSelf: "flex-end" }} className='px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-primary w-auto relative'>
                                            <Text className='text-base font-semibold text-white'>
                                                {msg.message}
                                            </Text>
                                        </View>
                                        <View style={{ alignSelf: "flex-end" }}>
                                            {msg?.timeStamp?.seconds && (
                                                <Text className='text-black text-[12px] font-semibold'>{new Date(parseInt(msg?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-US", {
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                    hour12: true
                                                })}</Text>
                                            )}
                                        </View>
                                    </View>
                                ) : (
                                    <View key={i} style={{ alignSelf: "flex-start" }} className='flex items-center justify-start m-1 '>
                                        <Text style={{ alignSelf: "flex-start" }} className='text-base font-semibold text-black'>
                                            {msg.user.fullName}
                                        </Text>
                                        <View className='flex-row items-center justify-center space-x-2'>
                                            {/* image */}
                                            <Image
                                                className='w-12 h-12 rounded-full'
                                                resizeMode='cover'
                                                source={{ uri: msg?.user?.profilePic }}
                                            />
                                            {/* text */}
                                            <View className='m-2'>
                                                <View className='px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-gray-200 w-auto relative'>
                                                    <Text className='text-base font-semibold text-black'>
                                                        {msg.message}
                                                    </Text>
                                                </View>
                                                <View style={{ alignSelf: "flex-start" }}>
                                                    {msg?.timeStamp?.seconds && (
                                                        <Text className='text-black text-[12px] font-semibold'>{new Date(parseInt(msg?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-US", {
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            hour12: true
                                                        })}</Text>
                                                    )}
                                                </View>
                                            </View>
                                        </View>

                                    </View>
                                ))}
                            </>)}
                    </ScrollView>

                    <View className='w-full flex-row items-center justify-center px-8'>
                        <View className='bg-gray-200 rounded-2xl px-4 py-2 space-x-4 flex-row items-center justify-center'>
                            <TouchableOpacity onPress={handleEmojiPress}>
                                <Entypo name='emoji-happy' size={24} color={'#555'} />
                            </TouchableOpacity>
                            <TextInput className='flex-1 h-full text-base text-primaryText font-semibold'
                                placeholder='Type here...'
                                placeholderTextColor={'#999'}
                                value={message}
                                onChangeText={(text) => setMessage(text)}
                            />
                            <TouchableOpacity>
                                <Entypo name='mic' size={24} color={'#43c651'} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className='pl-4' onPress={sendMessage}>
                            <FontAwesome name='send' size={24} color={'#555'} />
                        </TouchableOpacity>
                    </View>
                    {showEmojiSelector && (
                        <EmojiSelector style={{ height: 225 }} onEmojiSelected={(emoji) => {
                            setMessage((prevMessage) => prevMessage + emoji)
                        }} />
                    )}
                </>
                {/* </KeyboardAvoidingView> */}
            </View>
        </View>
    )
}

export default ChatScreen