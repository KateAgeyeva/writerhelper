import React from "react";
import { Button } from 'react-native-elements';
import { Text, StyleSheet } from "react-native";

const NotesScreen = () => {
    return <>
        <Text>Notes List</Text>
        <Text>Delete Note</Text>
        <Button title='Add a Note' />
    </>
};

const styles = StyleSheet.create({});

export default NotesScreen;

