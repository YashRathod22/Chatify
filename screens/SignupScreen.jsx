import { View, Text, Image, Dimensions, StatusBar, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react'
import { BgImage, LogoImage, Bg1Image } from '../assets'
import { UserTextInput } from '../components'
import { useNavigation } from '@react-navigation/native'
import { avatars } from '../utils/support'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { BlurView } from 'expo-blur';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth, firestoreDb } from '../config/firebase.config'
import { doc, setDoc } from 'firebase/firestore'

const SignupScreen = () => {
  const screenWidth = Math.round(Dimensions.get('window').width)
  const screenHeight = Math.round(Dimensions.get('window').height)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [name, setName] = useState("")
  const [Avatar, setAvatar] = useState(avatars[0]?.image.asset.url)
  const [isAvatarMenu, setIsAvatarMenu] = useState(false)
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false)
  const [showModal, setShowModal] = useState('');
  const [alert, setAlert] = useState('')

  const navigation = useNavigation();
  const handleAvatar = (item) => {
    setAvatar(item?.image.asset.url)
    setIsAvatarMenu(false)
  }

  const handleSignUp = async () => {
    if (getEmailValidationStatus && email !== "") {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then((userCred) => {
        const data = {
          _id: userCred?.user.uid,
          fullName: name,
          profilePic: Avatar,
          provideData: userCred.user.providerData[0]
        }
        setDoc(doc(firestoreDb, 'users', userCred?.user.uid), data).then(() => {
          navigation.navigate("LoginScreen")
        })
      }).catch((err) => {
        console.log(err);
        if (err.code === "auth/email-already-in-use") {
          setShowModal(true)
          setAlert("Email is already in use")
        } else if (err.code === "auth/weak-password") {
          setShowModal(true)
          setAlert("Password is too weak")
        } else {
          setShowModal(false)
        }

      })
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className='flex-1 items-center justify-start'>
        <StatusBar
          hidden={true}
        />
        <Image source={Bg1Image} resizeMode='cover' className='h-96' style={{ width: screenWidth }} />


        {/* list of avatars */}
        {isAvatarMenu && (
          <>
            <View className="absolute inset-0 z-10 w-full h-full" >
              <ScrollView contentContainerStyle={{ flexGrow: screenHeight }}>
                <BlurView className='w-full h-full px-4 py-16 flex-row flex-wrap items-center justify-evenly'
                  tint='light' intensity={90} style={{ width: screenWidth, height: screenHeight }}>
                  {
                    avatars.map((item) => (
                      <TouchableOpacity onPress={() => handleAvatar(item)} key={item._id} className='w-20 h-20 m-3 p-1 rounded-full border-2 border-primary relative'>
                        <Image source={{ uri: item?.image.asset.url }} className='w-full h-full' resizeMode='contain' />
                      </TouchableOpacity>
                    ))
                  }
                </BlurView>
              </ScrollView>
            </View>
          </>
        )}

        {/* Main View */}
        <View className='w-full h-full bg-white rounded-tl-[90px] -mt-48 items-center justify-start py-6 px-6 space-y-6'>
          <Image source={LogoImage} resizeMode='contain' className='w-16 h-16' />
          <Text className='py-2 text-primaryText text-xl font-semibold'>Join with Us!</Text>

          {/* alert */}
          <Modal transparent={true} visible={showModal} animationType='fade'>
            <View className='flex-1 justify-center items-center'>
              <View className='bg-background p-8 rounded-xl shadow-black' style={{ elevation: 5 }}>
                <Text style={{ fontSize: 25, color: 'black' }}>{alert}</Text>
                <TouchableOpacity className='bg-primary items-center mt-4 p-1 rounded-xl w-auto h-10' onPress={() => setShowModal(false)}>
                  <Text className=' text-white text-xl font-semibold' >Okay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Avatar section */}
          <View className="w-full flex items-center justify-center relative -my-4">
            <TouchableOpacity onPress={() => setIsAvatarMenu(true)} className="w-20 h-20 p-1 rounded-full border-2 border-primary relative">
              <Image source={{ uri: Avatar }} className="w-full h-full" resizeMode='contain' />
              <View className="w-6 h-6 bg-primary rounded-full absolute right-0 top-0 flex items-center justify-center">
                <MaterialIcons name="edit" size={18} color={'#fff'} />
              </View>
            </TouchableOpacity>
          </View>


          <View className='w-full flex items-center justify-center'>

            {/* Fullname */}
            <UserTextInput placeholder="Full Name" isPass={false} setStateValue={setName} />

            {/* email */}
            <UserTextInput placeholder="Email" isPass={false} setStateValue={setEmail} setGetEmailValidationStatus={setGetEmailValidationStatus} />
            {/* password */}
            <UserTextInput placeholder="Password" isPass={true} setStateValue={setPassword} />

            {/* loginButton */}
            <TouchableOpacity onPress={handleSignUp} className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center">
              <Text className="py-2 text-white text-xl font-semibold">Sign Up</Text>
            </TouchableOpacity>

            <View className="w-full py-12 flex-row items-center justify-center space-x-2">
              <Text className="text-base text-primaryText">Have an account!</Text>
              <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                <Text className="text-base font-semibold text-primaryBold">Login Here</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  )
}

export default SignupScreen;