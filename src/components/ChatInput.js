import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../redux/chatSlice';

export default function ChatInput() {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleSend = () => {
        dispatch(sendMessage({ text: message }));
        setMessage('');
    };

    return (
        <View>
            <TextInput
                placeholder="Type a message"
                value={message}
                onChangeText={setMessage}
            />
            <Button title="Send" onPress={handleSend} />
        </View>
    );
}
