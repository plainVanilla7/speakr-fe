// src/components/MessageBubble.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({ message }) {
  const isOwnMessage = message.isOwnMessage; // Determine if the message is sent by the user

  return (
    <View
      style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: "70%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  ownMessage: {
    backgroundColor: "#147efb",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#fff",
  },
});
