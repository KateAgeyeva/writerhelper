import React from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";

const ChapterNameScreen = () => {
    return <>
        <Text>Name</Text>
        <Text>Description</Text>
        <Text>Text</Text>
        <Button title='Delete Chapter' />
    </>
};

const styles = StyleSheet.create({});

export default ChapterNameScreen;

