import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'
// import { FontAwesome, Ionicons } from '@expo/vector-icons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { doc, setDoc } from 'firebase/firestore'
import { firestoreDb } from '../config/firebase.config'
import { StatusBar } from 'react-native'

const AddToChatScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.user.user);
    const [addChat, setAddChat] = useState("")

    const createNewChat = () => {
        let id = `${Date.now()}`
        const _doc = {
            _id: id,
            user: user,
            chatName: addChat
        }
        if (addChat !== "") {
            setDoc(doc(firestoreDb, "chats", id), _doc).then(() => {
                setAddChat("")
                navigation.replace("HomeScreen")
            }).catch((err) => {
                alert("Error: ", err);
            })
        }
    }
    return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} className='flex-1'> 
                <StatusBar
                    hidden={true}
                />
                <View className='w-full bg-primary px-4 py-6 flex-[0.25]'>
                    <View className='flex-row items-center justify-between w-full px-4 py-12 '>

                        {/* go back */}
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name='chevron-left' size={35} color={'#fbfbfb'} />
                        </TouchableOpacity>
                        {/* profile section */}
                        <View className='flex-row items-center justify-center space-x-3'>
                            <Image source={{ uri: user?.profilePic }} className='w-12 h-12' resizeMode='contain' />
                        </View>
                    </View>
                </View>

                {/* bottom section */}
                <View className='w-full bg-white px-4 py6 rounded-3xl flex-1 rounded-t-[50px] -mt-10'>
                    <View className='w-full px-4 py-4'>
                        <View className='w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-200 space-x-3'>
                            {/* icons */}
                            <Ionicons name='chatbubbles' size={24} color={'#777'} />
                            {/* textinput */}
                            <TextInput className='flex-1 text-lg text-primaryText -mt-1 h-12 w-full'
                                placeholder='Create a Chat'
                                placeholderTextColor={'#999'}
                                value={addChat}
                                onChangeText={(text) => setAddChat(text)}
                            />
                            {/* icon */}
                            <TouchableOpacity onPress={createNewChat} >
                                <FontAwesome name='send' size={24} color={'#777'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
    )
}

export default AddToChatScreen