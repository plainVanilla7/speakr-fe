import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatListScreen from "../screens/ChatListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Avatar from "../components/Avatar";
import { TouchableOpacity, View } from "react-native";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Customize Header for Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/*Register*/}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Create Account" }}
        />

        <Stack.Screen
          name="Inbox"
          component={ChatListScreen}
          options={({ navigation }) => ({
            title: "Your Chats",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <View style={{ marginRight: 15 }}>
                  <Avatar name="User Name" size={40} />
                </View>
              </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
          })}
        />

        {/* Custom Header for Chat Screen */}
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({
            title: `Chat with ${route.params.userId}`,
            headerStyle: { backgroundColor: "#6200ee" },
            headerTintColor: "#fff",
          })}
        />

        {/* Profile Screen Header */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            headerStyle: { backgroundColor: "#6200ee" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}