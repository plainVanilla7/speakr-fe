import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import ChatInput from "../components/ChatInput";

export default function ChatScreen() {
  const messages = useSelector((state) => state.chat.messages);
  const currentUser = "You";

  const renderItem = ({ item }) => {
    const isSentByUser = item.sender === currentUser;

    return (
      <View
        style={[
          styles.messageContainer,
          isSentByUser ? styles.messageRight : styles.messageLeft,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isSentByUser ? styles.bubbleRight : styles.bubbleLeft,
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>

        {isSentByUser ? (
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.avatarRight}
          />
        ) : (
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/1.jpg" }}
            style={styles.avatarLeft}
          />
        )}
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
        inverted
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
  avatarLeft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
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
  },
  messageLeft: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  messageRight: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
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
