import React from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";

const NewNoteScreen = () => {
    return <>
        <Input label='Name' autoCorrect={false} />
        <Input label='Text' autoCorrect={false} />
        <Button title='Save' />
    </>
};

const styles = StyleSheet.create({});

export default NewNoteScreen;

