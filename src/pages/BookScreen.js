import React from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableOpacity } from "react-native";

const BookScreen = () => {
    return <>
        <Text>Chapters</Text>
        <Button title='Add a Chapter' />
        <Button title='Notes' />
        <Text>Name</Text>
        <Text>Description</Text>
        <Text>Characters</Text>
        <Text>Inspiration</Text>
    </>
};

const styles = StyleSheet.create({});

export default BookScreen;

