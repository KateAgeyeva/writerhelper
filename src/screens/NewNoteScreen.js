import React, { useState } from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";
import { useSelector } from 'react-redux';

import bookApi from '../api/index';


const NewNoteScreen = ({ navigation, route }) => {
    const [note, setNote] = useState('');
    const state = useSelector((state) => state.book );

    const { _id } = route.params;
    const book = state.find((t) => t._id === _id);
    const id = book._id;


    const createNote = async (id) => {
        await bookApi.post(`/books/${id}/notes`, {
            note
        });
        navigation.navigate("Notes", { _id: id });
    }

    return <>
        <Input label='Text' autoCorrect={false} value={note} onChangeText={(text) => setNote(text)} />
        <Button title='Save' onPress={() => createNote(id)} />
    </>
};

const styles = StyleSheet.create({});

export default NewNoteScreen;

