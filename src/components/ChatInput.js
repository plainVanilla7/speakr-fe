import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { sendMessage } from "../redux/chatSlice";
import { MaterialIcons } from "@expo/vector-icons";

export default function ChatInput({ username }) {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleSend = () => {
    if (message.trim()) {
      dispatch(
        sendMessage({
          username,
          message: {
            text: message,
            sender: "You",
            timestamp: new Date().toLocaleTimeString(),
          },
        }),
      );
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <MaterialIcons name="send" size={24} color="#6200ee" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
  },
});
