import React from "react";
import { Button } from 'react-native-elements';
import { Text, StyleSheet } from "react-native";

import { useSelector } from "react-redux";

const NotesScreen = ({ navigation, route }) => {
    const state = useSelector((state) => state.book);

    const { _id } = route.params;
    const book = state.find((t) => t._id === _id);
    const id = book._id;

    return <>
        <Text>Notes List</Text>
        <Text>Delete Note</Text>
        <Text>Edit Note</Text>
        <Button title='Add a Note' onPress={() => navigation.navigate('NewNote', { _id: id })} />
    </>
};

const styles = StyleSheet.create({});

export default NotesScreen;

