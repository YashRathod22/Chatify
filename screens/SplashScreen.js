import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { LogoImage } from '../assets'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { firebaseAuth, firestoreDb } from '../config/firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import { SET_USER } from '../context/actions/userActions'

const SplashScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
      checkLoggedUser();
    }, [])

    const checkLoggedUser = async () => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred?.uid) {
                console.log("User ID:", userCred?.uid);
                getDoc(doc(firestoreDb, 'users', userCred?.uid)).then(docSnap => {
                    if (docSnap.exists()) {
                        console.log("User Data:", docSnap.data());
                        dispatch(SET_USER(docSnap.data()))
                    }
                }).then(()=>{
                    setTimeout(() => {
                        navigation.replace("HomeScreen")
                    }, 2000);
                }).catch((e)=>{
                    console.log(e);
                })
            } else {
                navigation.replace("LoginScreen")
            }
        })
    }


    return (
        <View className='flex-1 items-center justify-center space-y-24'>
            <Image source={LogoImage} className='w-24 h-24' resizeMode="contain" />
            <ActivityIndicator size={'large'} color={'#43c651'} />
        </View>
    )
}

export default SplashScreen