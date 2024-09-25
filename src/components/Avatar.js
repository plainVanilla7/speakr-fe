import React from 'react';
import { Avatar as PaperAvatar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function Avatar({ name, size = 50 }) {
    const getInitials = (name) => {
        const initials = name.split(' ').map(word => word[0]).join('');
        return initials.toUpperCase();
    };

    return (
        <PaperAvatar.Text
            size={size}
            label={getInitials(name)}
            style={styles.avatar}
        />
    );
}

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#6200ee',
    },
});
