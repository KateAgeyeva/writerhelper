import React from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";

const ChapterNameScreen = ({ navigation }) => {
    return <>
        <Text>Name</Text>
        <Text>Description</Text>
        <Text>Text</Text>
        <Button title='Delete Chapter' />
        <Button title='Book' onPress={() => navigation.navigate('Book')} />
    </>
};

const styles = StyleSheet.create({});

export default ChapterNameScreen;

