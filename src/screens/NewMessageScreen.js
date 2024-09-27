// src/screens/NewMessageScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { getContactsApi, searchUsersApi } from "../api/usersApi";
import Avatar from "../components/Avatar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function NewMessageScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const authToken = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getContactsApi(authToken);
      setContacts(data);
      setFilteredContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredContacts(contacts);
      return;
    }

    setLoadingSearch(true);
    try {
      const data = await searchUsersApi(authToken, query);
      setFilteredContacts(data);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const startConversation = async (userId) => {
    try {
      // Navigate to Chat screen with recipientId to create/get conversation
      navigation.navigate("Chat", { recipientId: userId });
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => startConversation(item._id)}
    >
      <Avatar uri={item.avatar} size={50} />
      <Text style={styles.contactName}>{item.username}</Text>
      <MaterialCommunityIcons
        name="message-text-outline"
        size={20}
        color="#147efb"
        style={styles.messageIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Message</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
          autoCorrect={false}
        />
        {searchQuery !== "" && (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color="#999"
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Contact List */}
      {loadingContacts ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#147efb" />
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderContactItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Users Found</Text>
              <Text style={styles.emptySubText}>
                Try searching for a different username.
              </Text>
            </View>
          }
        />
      )}

      {loadingSearch && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#147efb" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Header styles
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 15,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Search bar styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    margin: 15,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  clearIcon: {
    marginLeft: 10,
  },
  // Contact item styles
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contactName: {
    marginLeft: 15,
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  messageIcon: {
    marginLeft: "auto",
  },
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});
