import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import ChatInput from "../components/ChatInput";

export default function ChatScreen() {
  const messages = useSelector((state) => state.chat.messages);
  const currentUser = "You"; // Assume the current user's identifier

  const renderItem = ({ item }) => {
    const isSentByUser = item.sender === currentUser;

    return (
      <View
        style={[
          styles.messageContainer,
          isSentByUser ? styles.messageRight : styles.messageLeft,
        ]}
      >
        {/* Show avatar only for received messages */}
        {!isSentByUser && (
          <Image
            source={{ uri: "https://example.com/avatar.png" }} // Replace with actual avatar URL
            style={styles.avatar}
          />
        )}
        <View
          style={[
            styles.bubble,
            isSentByUser ? styles.bubbleRight : styles.bubbleLeft,
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageList}
        inverted // Ensures the latest message is at the bottom
      />
      <ChatInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageList: {
    padding: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  bubble: {
    padding: 10,
    borderRadius: 15,
    maxWidth: "70%",
  },
  bubbleLeft: {
    backgroundColor: "#EAEAEA",
  },
  bubbleRight: {
    backgroundColor: "#6200ee",
    marginLeft: "auto",
  },
  messageLeft: {
    justifyContent: "flex-start",
  },
  messageRight: {
    justifyContent: "flex-end",
  },
  messageText: {
    color: "#fff",
  },
  timestamp: {
    fontSize: 10,
    color: "#ccc",
    textAlign: "right",
    marginTop: 5,
  },
});
