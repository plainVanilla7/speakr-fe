import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function ChatSearchBar({ searchQuery, onSearch }) {
    return (
        <Searchbar
            placeholder="Search"
            value={searchQuery}
            onChangeText={onSearch}
            style={SX.searchBar}
        />
    );
}
const SX = StyleSheet.create({
    searchBar: {
        borderRadius:12,
    },
})
