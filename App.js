import React from "react";
import { View, Text, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddToChatScreen, ChatScreen, HomeScreen, LoginScreen, PrivacyPolicyScreen, ProfileScreen, SignupScreen, SplashScreen } from "./screens";
import { Provider } from "react-redux";
import Store from "./context/store";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AddToChatScreen" component={AddToChatScreen} />
          {/* <Stack.Screen name="AddFriendScreen" component={AddFriendScreen} /> */}
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          {/* <Stack.Screen name="FriendsChatScreen" component={FriendsChatScreen} /> */}
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

export default App;