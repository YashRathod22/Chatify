import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, StatusBar, TextInput, ScrollView } from 'react-native'
import React from 'react'
// import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import  FontAwesome from 'react-native-vector-icons/FontAwesome';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
    const user = useSelector((state) => state.user.user);
    const navigation = useNavigation();

    return (
        <ScrollView >
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
                    <View className='w-full px-4  items-center justify-center py-3 rounded-xl space-x-3'>
                        <Text className='font-semibold text-base text-center'>Privacy Policy for Chatify</Text>
                        <Text allowFontScaling={true} className='text-base mx-1 my-1'>At Chatify, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our Chatify application or website (collectively, the "Service"). Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.

                            1. Information We Collect

                            1.1. Personal Information: When you use our Service, we may collect personal information that can be used to identify you, such as your name, email address, phone number, and any other information you provide to us voluntarily.

                            1.2. Non-Personal Information: We may also collect non-personal information about your use of the Service, including but not limited to your device information, IP address, browser type, and usage statistics.

                            2. How We Use Your Information

                            2.1. Personal Information: We may use your personal information to:

                            Provide, operate, and maintain the Service.
                            Communicate with you about your account and provide customer support.
                            Personalize your experience and improve the Service.
                            Send you promotional and marketing communications.
                            Comply with legal obligations.
                            2.2. Non-Personal Information: We may use non-personal information for analytics purposes, to monitor and analyze trends, usage, and activities in connection with the Service.

                            3. How We Share Your Information

                            3.1. Service Providers: We may share your information with third-party service providers who help us operate our Service, conduct business activities on our behalf, or assist us in analyzing how our Service is used.

                            3.2. Legal Compliance: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).

                            3.3. Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of the transaction.

                            4. Data Retention

                            We will retain your information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.

                            5. Security

                            We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.

                            6. Your Choices

                            You can control and manage your information through your account settings or by contacting us directly. You may also opt-out of receiving promotional emails from us by following the instructions provided in the email.

                            7. Children's Privacy

                            Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.

                            8. Changes to This Privacy Policy

                            We may update our Privacy Policy from time to time. Any changes we make will be posted on this page, with an updated effective date. We encourage you to review this Privacy Policy periodically for any updates.

                            9.

                            By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
                            Contact Us

                            If you have any questions or concerns about this Privacy Policy or our practices, please contact us at
                            <Text className='text-primary' dataDetectorType={'email'}>yashrathod0226@gmail.com</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default PrivacyPolicyScreen