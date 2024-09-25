import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import Avatar from "../components/Avatar";

export default function ChatListScreen({ navigation }) {
  // Get conversations from Redux store
  const conversations = useSelector((state) => state.chat.conversations);

  // Transform conversations object into an array suitable for FlatList
  const chats = Object.keys(conversations).map((username) => {
    const messages = conversations[username];
    const lastMessage = messages[messages.length - 1].text; // Get last message from conversation
    return {
      id: username,
      user: username,
      lastMessage: lastMessage,
    };
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate("Chat", { username: item.id })}
    >
      <Avatar name={item.user} size={40} />
      <View style={styles.chatDetails}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No chats available.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  chatDetails: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    color: "#888",
  },
});
