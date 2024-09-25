import React, { useEffect, useRef } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ChatInput from "../components/ChatInput"; // Assuming you have a ChatInput component
import { sendMessage, markConversationAsRead } from "../redux/chatSlice"; // Import the action

export default function ChatScreen({ route }) {
  const { username } = route.params; // Get the username from route params

  const dispatch = useDispatch(); // Get the dispatch function

  // Access the conversation object
  const conversation = useSelector(
    (state) => state.chat.conversations[username],
  );

  // Extract messages from the conversation object
  const messages = conversation ? conversation.messages : [];

  const flatListRef = useRef(null);

  // Dispatch the action to mark the conversation as read when the component mounts
  useEffect(() => {
    if (conversation) {
      dispatch(markConversationAsRead({ username }));
    }
  }, [dispatch, username, conversation]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [messages]);

  const renderItem = ({ item }) => {
    const isSentByUser = item.sender === "You";

    return (
      <View style={[styles.messageContainer]}>
        {!isSentByUser && (
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/women/2.jpg",
            }}
            style={isSentByUser ? styles.avatarRight : styles.avatarLeft}
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
        {isSentByUser && (
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/1.jpg",
            }}
            style={isSentByUser ? styles.avatarRight : styles.avatarLeft}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />

      <View style={styles.chatInput}></View>
      <ChatInput username={username} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "flex-end",
  },
  chatInput: {},
  bubble: {
    padding: 10,
    borderRadius: 15,
    maxWidth: "70%",
  },
  bubbleLeft: {
    backgroundColor: "#53d769",
  },
  bubbleRight: {
    backgroundColor: "#147efb",
    marginLeft: "auto",
  },
  avatarLeft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  avatarRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#fff",
    textAlign: "right",
    marginTop: 5,
  },
});
