import React from 'react';
import { View, Text, Button } from 'react-native';

export default function RegisterScreen({ navigation }) {
    return (
        <View>
            <Text>Register Screen</Text>
            <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}
