// src/screens/ChatScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { sendMessageApi } from "../api/messagesApi";
import { createConversationApi } from "../api/conversationsApi";
import MessageBubble from "../components/MessageBubble";
import Icon from "react-native-vector-icons/Ionicons";

export default function ChatScreen({ route, navigation }) {
  const { conversationId, recipientId } = route.params;
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const authToken = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    if (conversationId) {
      // Existing conversation
      fetchConversation(conversationId);
    } else if (recipientId) {
      // Create a new conversation
      createConversation(recipientId);
    }
  }, [conversationId, recipientId]);

  const fetchConversation = async (id) => {
    try {
      // Fetch conversation details
      const data = await getConversationApi(authToken, id);
      setConversation(data);
      // Fetch messages
      const messagesData = await getMessagesApi(authToken, id);
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const createConversation = async (recipientId) => {
    try {
      const data = await createConversationApi(authToken, recipientId);
      setConversation(data);
      // Fetch messages if any
      const messagesData = await getMessagesApi(authToken, data._id);
      setMessages(messagesData);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    try {
      const messageData = await sendMessageApi(
        authToken,
        conversation._id,
        inputText,
      );
      setMessages([...messages, messageData]);
      setInputText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderItem = ({ item }) => <MessageBubble message={item} />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {conversation && conversation.participantName}
        </Text>
      </View>
      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        style={styles.messagesList}
        contentContainerStyle={{ padding: 10 }}
      />
      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Icon name="send" size={24} color="#147efb" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header styles
  header: {
    height: 60,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    left: 15,
  },
  // Messages list
  messagesList: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Input styles
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendButton: {
    marginLeft: 10,
  },
});
