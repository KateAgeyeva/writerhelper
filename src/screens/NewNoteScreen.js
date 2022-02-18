import React, { useState } from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";

import bookApi from '../api/index';


const NewNoteScreen = ({ navigation }) => {
    const [note, setNote] = useState('');

    const state = useSelector((state) => state.book );

    const createNote = async () => {
        await bookApi.post(`/books/${id}/notes`, {
            note
        });
        navigation.navigate("Book", { _id: id });
    }

    return <>
        <Input label='Text' autoCorrect={false} value={note} onChangeText={(text) => setNote(text)} />
        <Button title='Save' onPress={() => navigation.navigate('Notes')} />
    </>
};

const styles = StyleSheet.create({});

export default NewNoteScreen;

