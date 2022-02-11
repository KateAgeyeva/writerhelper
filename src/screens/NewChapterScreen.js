import React from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";

const NewChapterScreen = ({ navigation }) => {
    return <>
        <Input label='Name' autoCorrect={false} />
        <Input label='Description' autoCorrect={false} />
        <Input label='Text' autoCorrect={false} />
        <Button title='Save' onPress={() => navigation.navigate('ChapterName')} />
    </>
};

const styles = StyleSheet.create({});

export default NewChapterScreen;

