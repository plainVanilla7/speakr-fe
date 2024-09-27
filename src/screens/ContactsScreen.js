// src/screens/ContactsScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { getContactsApi, searchUsersApi } from "../api/usersApi";
import Avatar from "../components/Avatar";
import Icon from "react-native-vector-icons/Ionicons";

export default function ContactsScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    setLoadingSearch(true);
    try {
      const data = await searchUsersApi(authToken, query);
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const startConversation = (userId) => {
    navigation.navigate("Chat", { recipientId: userId });
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => startConversation(item._id)}
    >
      <Avatar uri={item.avatar} size={50} />
      <Text style={styles.contactName}>{item.username}</Text>
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
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contacts</Text>
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {/* Search Results */}
      {searchQuery.trim() !== "" ? (
        loadingSearch ? (
          <ActivityIndicator size="large" color="#147efb" />
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item._id}
            renderItem={renderContactItem}
            ListEmptyComponent={<Text>No users found.</Text>}
          />
        )
      ) : loadingContacts ? (
        <ActivityIndicator size="large" color="#147efb" />
      ) : (
        // Contacts List
        <FlatList
          data={contacts}
          keyExtractor={(item) => item._id}
          renderItem={renderContactItem}
          ListEmptyComponent={<Text>No contacts available.</Text>}
        />
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
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    left: 15,
  },
  // Search bar styles
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    margin: 10,
  },
  searchInput: {
    height: 40,
  },
  // Contact item styles
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contactName: {
    marginLeft: 15,
    fontSize: 16,
    color: "#000",
  },
});
