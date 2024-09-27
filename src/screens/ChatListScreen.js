// src/screens/ChatListScreen.js

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
import Icon from "react-native-vector-icons/FontAwesome"; // Updated Icon import
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#147efb" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
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
      avatar: conversation.participantAvatar,
    };
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate("Chat", { conversationId: item.id })}
    >
      <Avatar uri={item.avatar} size={60} />
      <View style={styles.chatDetails}>
        <Text
          style={[
            styles.userName,
            item.hasUnreadMessages && styles.unreadUserName,
          ]}
        >
          {item.user}
        </Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.hasUnreadMessages && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Direct</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Contacts")}
            style={styles.headerIcon}
          >
            <MaterialCommunityIcons
              name="access-point"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewMessage")}
            style={styles.headerIcon}
          >
            <MaterialCommunityIcons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your Messages</Text>
            <Text style={styles.emptySubText}>
              Send private photos and messages to a friend or group.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Header styles
  header: {
    height: 60,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerIcons: {
    flexDirection: "row",
    position: "absolute",
    right: 15,
  },
  headerIcon: {
    marginLeft: 20,
  },
  // Chat item styles
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  chatDetails: {
    marginLeft: 15,
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    color: "#000",
  },
  unreadUserName: {
    fontWeight: "bold",
  },
  lastMessage: {
    color: "#999",
    fontSize: 14,
    marginTop: 2,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#147efb",
    marginLeft: "auto",
  },
  // Empty component styles
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  emptyText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  emptySubText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
  },
});
