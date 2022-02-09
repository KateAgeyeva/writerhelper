import React from "react";
import { Button } from 'react-native-elements';
import { Text, StyleSheet } from "react-native";

const MyBooksScreen = () => {
    return <>
        <Button title='Create a Book' />
        <Text>Delete Book</Text>
        <Button title='Create a Book' />
    </>
};

const styles = StyleSheet.create({});

export default MyBooksScreen;

//CREATE A SINGLE COMPONENT FOR MYBOOKS AND NOTES!