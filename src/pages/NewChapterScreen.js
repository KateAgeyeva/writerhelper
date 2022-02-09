import React from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";

const NewChapterScreen = () => {
    return <>
        <Input label='Name' autoCorrect={false} />
        <Input label='Description' autoCorrect={false} />
        <Input label='Text' autoCorrect={false} />
        <Button title='Save' />
    </>
};

const styles = StyleSheet.create({});

export default NewChapterScreen;

