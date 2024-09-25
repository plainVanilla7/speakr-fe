import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ChatSearchBar from '../components/ChatSearchBar';
import Avatar from '../components/Avatar';

export default function ChatListScreen({ navigation }) {
    const chats = useSelector(state => state.chat.chats);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredChats, setFilteredChats] = useState(chats);


    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredChats(chats);
        } else {
            const filtered = chats.filter(chat =>
                chat.user.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredChats(filtered);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('Chat', { userId: item.id })}
        >
            <Avatar name={item.user} size={40} />
            <View style={styles.chatDetails}>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <ChatSearchBar searchQuery={searchQuery} onSearch={handleSearch} />
            </View>
            <FlatList
                data={filteredChats}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text>No chats available.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    chatDetails: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lastMessage: {
        color: '#888',
    },
    searchBarContainer: {},
});
