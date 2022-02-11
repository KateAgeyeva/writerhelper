import React from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableOpacity } from "react-native";

const BookScreen = ({ navigation }) => {
    return <>
        <Button title='Chapters' onPress={() => navigation.navigate('ChapterName')} />
        <Button title='Add a Chapter' onPress={() => navigation.navigate('NewChapter')} />
        <Button title='Notes' onPress={() => navigation.navigate('Notes')} />
        <Text>Name</Text>
        <Text>Description</Text>
        <Text>Characters</Text>
        <Text>Inspiration</Text>
        <Button title='My Books' onPress={() => navigation.navigate('MyBooks')} />
    </>
};

const styles = StyleSheet.create({});

export default BookScreen;

