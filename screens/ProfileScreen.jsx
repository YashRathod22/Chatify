import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import React from 'react'
// import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Media1Image, Media2Image, Media3Image } from '../assets'
import { firebaseAuth } from '../config/firebase.config'
import { SET_USER_NULL } from '../context/actions/userActions'

const ProfileScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch()

    const Logout = ()=>{
        Alert.alert('Alert', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => handleLogout() },
        ]);
    }
    
    const handleLogout = async () => {
        await firebaseAuth.signOut().then(() => {
            dispatch(SET_USER_NULL())
            navigation.replace("LoginScreen")
        })
    }

    return (
        <SafeAreaView className='flex-1 items-center justify-start'>
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* icons */}
            <View className='w-full flex-row items-center justify-between px-4 py-4'>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <MaterialIcons name='chevron-left' size={24} color={'#555'} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo name='dots-three-vertical' size={24} color={'#555'} />
                </TouchableOpacity>
            </View>
            {/* profile */}
            <View className='items-center justify-center'>
                <View className='relative border-2 border-primary p-1 rounded-full'>
                    <Image source={{ uri: user?.profilePic }}
                        className='w-24 h-24'
                        resizeMode='contain' />
                </View>
                <Text className='text-xl font-semibold text-primaryBold pt-3'>
                    {user?.fullName}
                </Text>
                <Text className='text-base font-semibold text-primaryText'>
                    {user?.provideData.email}
                </Text>
            </View>
            {/* icons section */}
            <View className='w-full flex-row items-center justify-evenly py-6'>
                <View className='items-center justify-center'>
                    <TouchableOpacity className='items-center justify-center w-12 h-12 rounded-lg bg-gray-200'>
                        <MaterialIcons name='messenger-outline' size={24} color={'#555'} />
                    </TouchableOpacity>
                    <Text className='text-sm text-primaryText py-1'>Message</Text>
                </View>
                <View className='items-center justify-center'>
                    <TouchableOpacity className='items-center justify-center w-12 h-12 rounded-lg bg-gray-200'>
                        <Ionicons name='videocam-outline' size={24} color={'#555'} />
                    </TouchableOpacity>
                    <Text className='text-sm text-primaryText py-1'>Video Call</Text>
                </View>
                <View className='items-center justify-center'>
                    <TouchableOpacity className='items-center justify-center w-12 h-12 rounded-lg bg-gray-200'>
                        <Ionicons name='call-outline' size={24} color={'#555'} />
                    </TouchableOpacity>
                    <Text className='text-sm text-primaryText py-1'>Call</Text>
                </View>
                <View className='items-center justify-center'>
                    <TouchableOpacity className='items-center justify-center w-12 h-12 rounded-lg bg-gray-200'>
                        <Entypo name='dots-three-horizontal' size={24} color={'#555'} />
                    </TouchableOpacity>
                    <Text className='text-sm text-primaryText py-1'>More</Text>
                </View>
            </View>
            {/* medias shared */}
            <View className='w-full px-6 space-y-3'>
                <View className='w-full flex-row items-center justify-between'>
                    <Text className='text-base font-semibold text-primaryText'>
                        Media Shared
                    </Text>
                    <TouchableOpacity>
                        <Text className='text-base uppercase font-semibold text-primaryText'>
                            View All
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className='w-full py-4 px-4 flex-row items-center justify-between'>
                <TouchableOpacity className='w-24 h-24 bg-gray-300 rounded-xl overflow-hidden'>
                    <Image
                        className='w-full h-full'
                        source={Media3Image}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
                <TouchableOpacity className='w-24 h-24 bg-gray-300 rounded-xl overflow-hidden'>
                    <Image
                        className='w-full h-full'
                        source={Media2Image}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
                <TouchableOpacity className='w-24 h-24 bg-gray-300 rounded-xl overflow-hidden'>
                    <Image
                        className='w-full h-full'
                        source={Media1Image}
                        resizeMode='cover'
                    />
                    <View className='absolute w-full h-full items-center justify-center bg-[#00000068]'>
                        <Text className='text-base text-white font-semibold'>10+</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* settings options */}
            <View className='w-full px-6 py-3 flex-row items-center justify-between'>
                <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicyScreen")} className='flex-row items-center'>
                    <MaterialIcons name='security' size={24} color={'#555'} />
                    <Text className='text-base font-semibold text-primaryText px-3'>
                        Privacy
                    </Text>
                </TouchableOpacity>
                <MaterialIcons name='chevron-right' size={28} color={'#555'} />
            </View>
            <View className='w-full px-6 py-3 flex-row items-center justify-between'>
                <View className='flex-row items-center'>
                    <MaterialIcons name='message' size={24} color={'#555'} />
                    <Text className='text-base font-semibold text-primaryText px-3'>
                        Groups
                    </Text>
                </View>
                <MaterialIcons name='chevron-right' size={28} color={'#555'} />
            </View>
            <View className='w-full px-6 py-3 flex-row items-center justify-between'>
                <View className='flex-row items-center'>
                    <MaterialIcons name='music-note' size={24} color={'#555'} />
                    <Text className='text-base font-semibold text-primaryText px-3'>
                        Media's & Downloads
                    </Text>
                </View>
                <MaterialIcons name='chevron-right' size={28} color={'#555'} />
            </View>
            <View className='w-full px-6 py-3 flex-row items-center justify-between'>
                <View className='flex-row items-center'>
                    <MaterialIcons name='person' size={24} color={'#555'} />
                    <Text className='text-base font-semibold text-primaryText px-3'>
                        Account
                    </Text>
                </View>
                <MaterialIcons name='chevron-right' size={28} color={'#555'} />
            </View>
            <TouchableOpacity onPress={Logout} className='w-full px-6 py-4 flex-row items-center justify-center'>
                <Text className='text-lg font-semibold text-primaryBold px-3'>
                    Logout
                </Text>
            </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen