import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LogoImage } from '../assets';
// import { Ionicons, FontAwesome5, MaterialIcons } from 'react-native-vector-icons';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import  FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { firestoreDb, userRef } from '../config/firebase.config';


const HomeScreen = ({ room }) => {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true)
  const [chats, setChats] = useState(null)
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const chatQuery = query(collection(firestoreDb, "chats"), orderBy("_id", "desc"));
    const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
      const chatRooms = querySnapShot.docs.map(doc => doc.data())
      setChats(chatRooms)
      setIsLoading(false)
    })

    // Return the unsubscribe function to stop listening to the updates
    return unsubscribe

  }, [])
 
  

  return (
    <View className="flex-1">
      <SafeAreaView>
        <View className='w-full flex-row items-center justify-between px-4 py-2'>
          <Image source={LogoImage} className='w-12 h-12' resizeMode='contain' />
          <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} className='w-12 h-12 rounded-full border border-primary flex items-center justify-center'>
            <Image source={{ uri: user?.profilePic }} className='w-full h-full' resizeMode='cover' />
          </TouchableOpacity>
        </View>

        {/* Scrolling Area */}
        <ScrollView showsVerticalScrollIndicator={false} className='w-full px-4 pt-4'>
          <View className='w-full'>
            {/* Messages Title */}
            <View className='w-full flex-row items-center justify-between px-2'>
              <Text className='text-primaryText text-base font-extrabold pb-2'>
                Messages 
              </Text>
              <View className='flex-row space-x-3'>
                <TouchableOpacity onPress={() => navigation.navigate("AddToChatScreen")}>
                  <Ionicons name='chatbox' size={28} color={'#555'} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate("AddFriendScreen")}>
                  <MaterialIcons name='person-add-alt-1' size={28} color={'#555'} />
                </TouchableOpacity> */}
              </View>
            </View>
            
            {isLoading ? <>
              <View className="w-full flex items-center justify-center">
                <ActivityIndicator size={'large'} color={'#43c651'} />
              </View>
            </> :
              <>
                {chats && chats?.length > 0 ? (<>
                  {chats?.map(room => (
                    <MessageCard key={room._id} room={room} />
                  ))}
                </>) : (<></>)}
              </>}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const MessageCard = ({ room }) => 
{
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [lastMessage, setLastMessage] = useState(undefined)

  
  useLayoutEffect(() => {
    const msgQuery = query(
      collection(firestoreDb, "chats", room._id, "messages"),
      orderBy("_id", "desc")
    )

    const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
      const updatedMsg = querySnap.docs.map(doc => doc.data())
      setLastMessage(updatedMsg[0] ? updatedMsg[0] : null)
      // setIsLoading(false)
    })

    return unsubscribe
  }, [])

  // console.log('last message:', lastMessage?.uid);
  // console.log(user?.provideData?.uid);
  // console.log(lastMessage?.user?.provideData?.uid);
  const renderLastMessage = () => {
    if (typeof lastMessage == 'undefined') return "Loading..."
    if (lastMessage) {
      if (user?.provideData?.uid == lastMessage?.user?.provideData?.uid) return "You: " + lastMessage?.message;
      return `${lastMessage?.user?.fullName}: ` + lastMessage?.message
    } else {
      return "Say Hi 👋"
    }
  }

  const formatDate = date => 
  {
    var day = date.getDate();
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    var month = monthNames[date.getMonth()];

    var formattedDate = day + ' ' + month;
    return formattedDate;
  }

  const renderTime = () => {
    if (lastMessage) {
      // console.log('last message time: ', lastMessage?.timeStamp);
      let date = lastMessage?.timeStamp;
      return formatDate(new Date(date?.seconds * 1000))

    }
  }

  return (
    <View>
      <StatusBar
        hidden={true}
      />
      <TouchableOpacity onPress={() => navigation.navigate("ChatScreen", { room: room })} className='w-full flex-row items-center justify-start py-2'>
        {/* Image */}
        <View className='w-16 h-16 rounded-full flex items-center border-2 border-primary justify-center p-1'>
          <FontAwesome5 name='users' size={24} color={'#555'} />
        </View>
        {/* Content */}
        <View className='flex-1 flex items-start justify-center ml-4'>
          <Text className='text-[#333]  text-base font-semibold capitalize'>
            {room.chatName}
          </Text>
          <Text className='text-primaryText text-sm'>
            {renderLastMessage()}
          </Text>
        </View>
        {/* time text */}
        <View className='flex-1 flex items-end justify-end ' >
          <Text className='text-primary text-base font-semibold ml '>{renderTime()}
          </Text>
          <Text className='text-primary text-sm' style={{ fontSize: 10 }}>
            {new Date(parseInt(lastMessage?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true
            })}
          </Text>
        </View>

      </TouchableOpacity>
    </View>
  )
}


export default HomeScreen