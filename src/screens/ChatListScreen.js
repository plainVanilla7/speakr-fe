import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { loadConversations } from "../redux/chatSlice";
import Avatar from "../components/Avatar";

export default function ChatListScreen({ navigation }) {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);

  useEffect(() => {
    dispatch(loadConversations());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#147efb" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const chats = Object.values(conversations).map((conversation) => {
    const messages = conversation.messages || [];
    const lastMessage =
      messages.length > 0 ? messages[messages.length - 1].text : "";
    const hasUnreadMessages =
      conversation.lastReadMessageIndex < messages.length - 1;

    return {
      id: conversation.id,
      user: conversation.participantName,
      lastMessage: lastMessage,
      hasUnreadMessages: hasUnreadMessages,
    };
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate("Chat", { conversationId: item.id })}
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
        keyExtractor={(item) => item.id.toString()}
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
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    color: "#888",
  },
});
