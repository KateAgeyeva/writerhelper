import React from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";

import { useSelector } from 'react-redux';

const ChapterNameScreen = ({ navigation, route }) => {
    const state = useSelector((state) => state.chapter);
    console.log(state);

    return <>
        <Text>{state.chapterName}</Text>
        <Text>{state.chapterDescription}</Text>
        <Text>{state.chapterText}</Text>
        <Button title='Delete Chapter' />
        <Button title='Book' onPress={() => navigation.navigate('Book')} />
    </>
};

const styles = StyleSheet.create({});

export default ChapterNameScreen;

