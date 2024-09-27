import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ChatInput from "../components/ChatInput";
import { loadMessages, markConversationAsRead } from "../redux/chatSlice";

export default function ChatScreen({ route }) {
  const { conversationId } = route.params;

  const dispatch = useDispatch();

  const conversation = useSelector(
    (state) => state.chat.conversations[conversationId],
  );
  const messages = conversation ? conversation.messages : [];
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);

  const flatListRef = useRef(null);

  useEffect(() => {
    dispatch(loadMessages(conversationId));
  }, [dispatch, conversationId]);

  useEffect(() => {
    if (conversation) {
      dispatch(markConversationAsRead({ conversationId }));
    }
  }, [dispatch, conversationId, conversation]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [messages]);

  const renderItem = ({ item }) => {
    const isSentByUser = item.senderId === conversation.currentUserId;

    return (
      <View style={styles.messageContainer}>
        {!isSentByUser && (
          <Image
            source={{
              uri: item.senderAvatarUrl || "https://via.placeholder.com/40",
            }}
            style={styles.avatarLeft}
          />
        )}
        <View
          style={[
            styles.bubble,
            isSentByUser ? styles.bubbleRight : styles.bubbleLeft,
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestamp}>
            {new Date(item.timestamp).toLocaleTimeString()}
          </Text>
        </View>
        {isSentByUser && (
          <Image
            source={{
              uri: item.senderAvatarUrl || "https://via.placeholder.com/40",
            }}
            style={styles.avatarRight}
          />
        )}
      </View>
    );
  };

  if (loading && messages.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#147efb" />
      </View>
    );
  }

  if (error && messages.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        inverted
      />
      <View style={styles.chatInput}>
        <ChatInput conversationId={conversationId} />
      </View>
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
  chatInput: { marginBottom: "2%" },
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
