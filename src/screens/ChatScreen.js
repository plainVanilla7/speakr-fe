import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ChatInput from '../components/ChatInput';

export default function ChatScreen() {
    const messages = useSelector(state => state.chat.messages);

    return (
        <View>
            <Text>Chat Screen</Text>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text>{item.text}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
            <ChatInput />
        </View>
    );
}
