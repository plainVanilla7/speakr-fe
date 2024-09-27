// src/components/ChatInput.js
import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { sendMessageThunk } from "../redux/chatSlice";
import { SocketContext } from "../context/SocketContext";

export default function ChatInput({ conversationId }) {
  const [messageText, setMessageText] = useState("");
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const handleSend = () => {
    if (messageText.trim()) {
      const message = {
        text: messageText,
        timestamp: new Date().toISOString(),
      };

      // Emit the message via Socket.IO
      socket.emit("sendMessage", { conversationId, message: message.text });

      // Dispatch the thunk to send the message via API and update the store
      dispatch(sendMessageThunk({ conversationId, message: message.text }));

      setMessageText("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={messageText}
        onChangeText={setMessageText}
        placeholder="Type a message"
        style={styles.input}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
  },
});
