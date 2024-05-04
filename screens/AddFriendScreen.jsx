import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from '../config/firebase.config';
import { useSelector } from 'react-redux';
import { FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddFriendScreen = ({ room }) => {
    const navigation = useNavigation();
    const [users, setUsers] = useState()
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        getUsers();
        // const usersQuery = collection(firestoreDb, 'users')
        // const subscribe = onSnapshot(usersQuery, (snapShot)=>{
        //   let usersList = []
        //   snapShot.docs.map((doc)=>usersList.push({...doc.data(), id: doc.id}))
        //   setUsers(usersList)
        //   console.log(usersList);
        // })
        // return subscribe
    }, [])

    const getUsers = async () => {
        const q = query(userRef, where('fullName', '!=', user?.fullName))
        const querySnapShot = await getDocs(q);
        let data = []
        querySnapShot.forEach(doc => {
            data.push({ ...doc.data() })

        });
        setUsers(data)
        console.log(data);
    }

    const renderItem = ({ item, room }) => (
        <View>
      <TouchableOpacity onPress={() => navigation.navigate("FriendsChatScreen", { item: item })} className='w-full flex-row items-center justify-start py-2'>
        {/* Image */}
        <View className='w-16 h-16 rounded-full flex items-center border-2 border-primary justify-center p-1'>
          {/* <FontAwesome5 name='users' size={24} color={'#555'} /> */}
          <Image source={{uri: item?.profilePic}} className='w-12 h-12' resizeMode='cover'/>
        </View>
        {/* Content */}
        <View className='flex-1 flex items-start justify-center ml-4'>
          <Text className='text-[#333]  text-base font-semibold capitalize'>
            {item.fullName}
          </Text>
          <Text className='text-primaryText text-sm'>
            {}
          </Text>
        </View>
        {/* time text */}
        <View className='flex-1 flex items-end justify-end ' >
          <Text className='text-primary text-base font-semibold ml '>{}
          </Text>
          <Text className='text-primary text-sm' style={{ fontSize: 10 }}>
            {/* {new Date(parseInt(lastMessage?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true
            })} */}
          </Text>
        </View>

      </TouchableOpacity>
    </View>
    )


    return (<>
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
                <View className='w-full px-4 flex-row items-center justify-between py-3 rounded-xl  space-x-3'>
                    <FlatList
                        data={users}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                    
                </View>
            </View>
        </View>

    </>
    )
}

export default AddFriendScreen