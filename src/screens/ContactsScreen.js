import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchContacts,
  addContact,
  searchUsers,
  clearSearchResults,
} from "../redux/contactsSlice";
import Avatar from "../components/Avatar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ContactsScreen({ navigation }) {
  const dispatch = useDispatch();
  const {
    contacts,
    loading,
    error,
    searchResults,
    searchLoading,
    searchError,
  } = useSelector((state) => state.contacts);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (contactId) => {
    dispatch(addContact(contactId))
        .unwrap()
        .then(() => {
          Alert.alert("Success", "Contact added successfully");
          dispatch(fetchContacts()); // Refresh contacts
        })
        .catch((err) => {
          Alert.alert("Error", err.message || "Failed to add contact");
        });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      dispatch(clearSearchResults());
      return;
    }
    dispatch(searchUsers(query));
  };

  const renderContactItem = ({ item }) => (
      <TouchableOpacity
          style={styles.contactItem}
          onPress={() => handleAddContact(item._id)}
      >
        <Avatar uri={item.avatar} size={55} style={styles.avatar} />
        <Text style={styles.contactName}>{item.username}</Text>
        <MaterialCommunityIcons
            name="plus-circle-outline"
            size={26}
            color="#147efb"
            style={styles.addIcon}
        />
      </TouchableOpacity>
  );

  const renderAddedContactItem = ({ item }) => (
      <TouchableOpacity
          style={styles.contactItem}
          onPress={() => navigation.navigate("Chat", { conversationId: item.id })}
      >
        <Avatar uri={item.avatar} size={55} style={styles.avatar} />
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.username}</Text>
        </View>
      </TouchableOpacity>
  );

  return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons name="chevron-left" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Contacts</Text>
          </View>

          <View style={styles.searchContainer}>
            <MaterialCommunityIcons
                name="magnify"
                size={22}
                color="#999"
                style={styles.searchIcon}
            />
            <TextInput
                style={styles.searchInput}
                placeholder="Search for friends"
                value={searchQuery}
                onChangeText={handleSearch}
                autoCorrect={false}
            />
            {searchQuery !== "" && (
                <TouchableOpacity onPress={() => handleSearch("")}>
                  <MaterialCommunityIcons
                      name="close-circle"
                      size={22}
                      color="#999"
                      style={styles.clearIcon}
                  />
                </TouchableOpacity>
            )}
          </View>

          {searchQuery !== "" ? (
              searchLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#147efb" />
                  </View>
              ) : searchError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{searchError}</Text>
                  </View>
              ) : (
                  <FlatList
                      data={searchResults}
                      keyExtractor={(item) => item._id.toString()}
                      renderItem={renderContactItem}
                      ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                          <Text style={styles.emptyText}>No Users Found</Text>
                        </View>
                      }
                  />
              )
          ) : (
              <View style={styles.contactsListContainer}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="large" color="#147efb" />
                    </View>
                ) : error ? (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : (
                    <FlatList
                        data={contacts}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={renderAddedContactItem}
                        ListEmptyComponent={
                          <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No Contacts Added</Text>
                            <Text style={styles.emptySubText}>
                              Add some friends to start chatting :)
                            </Text>
                          </View>
                        }
                    />
                )}
              </View>
          )}

          {searchLoading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#147efb" />
              </View>
          )}
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Header styles
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 0, // Remove bottom border to keep it clean like Instagram
    elevation: 1, // Soft shadow
  },
  backButton: {
    position: "absolute",
    left: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  // Search bar styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    margin: 15,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 40,
    elevation: 1, // Slight shadow for depth
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  contactName: {
    marginLeft: 15,
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  avatar: {
    borderRadius: 27.5, // Make avatar fully rounded
    borderWidth: 1,
    borderColor: "#ddd", // Subtle border to mimic Instagram's style
  },
  addIcon: {
    marginLeft: "auto",
  },
  contactDetails: {
    marginLeft: 15,
    flex: 1,
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
  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 16,
    textAlign: "center",
  },
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    alignSelf: "center",
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

  contactsListContainer: {
    flex: 1,
  },
});
