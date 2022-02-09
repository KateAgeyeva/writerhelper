import React from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";

const NewBookScreen = () => {
    return <>
        <Input label='Name' autoCorrect={false} />
        <Input label='Description' autoCorrect={false} />
        <Input label='Characters' autoCorrect={false} />
        <Input label='Inspiration' autoCorrect={false} />
        <Button title='Create' />
    </>
};

const styles = StyleSheet.create({});

export default NewBookScreen;

