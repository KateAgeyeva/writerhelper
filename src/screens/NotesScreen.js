import React from "react";
import { Button } from 'react-native-elements';
import { Text, StyleSheet } from "react-native";

const NotesScreen = ({ navigation }) => {
    return <>
        <Text>Notes List</Text>
        <Text>Delete Note</Text>
        <Text>Edit Note</Text>
        <Button title='Add a Note' onPress={() => navigation.navigate('NewNote')} />
    </>
};

const styles = StyleSheet.create({});

export default NotesScreen;

