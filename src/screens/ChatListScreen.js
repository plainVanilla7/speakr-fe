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
  const conversations = useSelector((state) => state.chat.conversations);
  const chats = Object.keys(conversations).map((username) => {
    const conversation = conversations[username];
    const messages = conversation.messages || [];
    const lastMessage =
      messages.length > 0 ? messages[messages.length - 1].text : "";
    const hasUnreadMessages =
      conversation.lastReadMessageIndex < messages.length - 1;

    return {
      id: username,
      user: username,
      lastMessage: lastMessage,
      hasUnreadMessages: hasUnreadMessages,
    };
  });
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate("Chat", { username: item.id })}
    >
      <Avatar name={item.user} size={40} />
      <View style={styles.chatDetails}>
        <Text
          style={[
            styles.userName,
            item.hasUnreadMessages && styles.unreadUserName,
          ]}
        >
          {item.user}
        </Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      {item.hasUnreadMessages && <View style={styles.unreadDot} />}
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
  unreadUserName: {
    fontWeight: "bold",
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "blue",
    marginLeft: "auto",
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
