import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatListScreen from "../screens/ChatListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ContactsScreen from "../screens/ContactsScreen";
import NewMessageScreen from "../screens/NewMessageScreen";
import Avatar from "../components/Avatar";
import { TouchableOpacity, View } from "react-native";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({
            title: `${route.params.username}`,
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
          })}
        />
        {/* Profile Screen Header */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{
            title: "Contacts",
              headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewMessage"
          component={NewMessageScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
