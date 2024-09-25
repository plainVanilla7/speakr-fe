import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(login({ username }));
        navigation.navigate('Inbox');
    };

    return (
        <View>
            <Text>Login Screen</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}
