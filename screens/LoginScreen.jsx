import { View, Text, Image, Dimensions, StatusBar, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Bg1Image, BgImage, LogoImage } from '../assets'
import { UserTextInput } from '../components'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth, firestoreDb } from '../config/firebase.config'
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { SET_USER } from '../context/actions/userActions'

const LoginScreen = () => {
  const screenWidth = Math.round(Dimensions.get('window').width)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [showModal, setShowModal] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (getEmailValidationStatus && email !== "") {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(userCred => {
          if (userCred) {
            console.log("User ID:", userCred?.user.uid);
            getDoc(doc(firestoreDb, 'users', userCred?.user.uid)).then(docSnap => {
              if (docSnap.exists()) {
                console.log("User Data:", docSnap.data());
                dispatch(SET_USER(docSnap.data()))
              }
            })
          }
        })
        .catch((err) => {
          console.log("Error:", err.message);
          if (err.message.includes("invalid-credential")) {
            setShowModal(true)
            setAlertMessage("Invalid Credential!")
          }else if(err.message.includes("too-many-requests")){
            setShowModal(true)
            setAlertMessage("Attempts limit Exceeded")
          }
           else {
            setShowModal(false)
          }
        })
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      <View className='flex-1 items-center justify-start'>
        <StatusBar
          hidden={true}
        />
        <Image source={Bg1Image} resizeMode='cover' className='h-96' style={{ width: screenWidth }} />

        {/* Main View */}
        <View className='w-full h-full bg-white rounded-tl-[90px] -mt-48 items-center justify-start py-6 px-6 space-y-6'>
          <Image source={LogoImage} resizeMode='contain' className='w-16 h-16' />
          <Text className='py-2 text-primaryText text-xl font-semibold'>Welcome To Chatify!!</Text>

          <View className='w-full flex items-center justify-center'>

            {/* alert */}

            <Modal transparent={true} visible={showModal} animationType='fade'>
              <View className='flex-1 justify-center items-center'>
                <View className='bg-background p-8 rounded-xl shadow-black' style={{ elevation: 5 }}>
                  <Text style={{ fontSize: 25, color: 'black' }}>{alertMessage}</Text>
                  <TouchableOpacity className='bg-primary items-center mt-4 p-1 rounded-xl w-auto h-10' onPress={() => setShowModal(false)}>
                    <Text className=' text-white text-xl font-semibold' >Okay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {/* email */}
            <UserTextInput placeholder="Email" isPass={false} setStateValue={setEmail} setGetEmailValidationStatus={setGetEmailValidationStatus} />
            {/* password */}
            <UserTextInput placeholder="Password" isPass={true} setStateValue={setPassword} />

            {/* loginButton */}
            <TouchableOpacity onPress={handleLogin} className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center">
              <Text className="py-2 text-white text-xl font-semibold">Log In</Text>
            </TouchableOpacity>

            <View className="w-full py-12 flex-row items-center justify-center space-x-2">
              <Text className="text-base text-primaryText">Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                <Text className="text-base font-semibold text-primaryBold">Create Here</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  )
}

export default LoginScreen