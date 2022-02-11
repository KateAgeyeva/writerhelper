import React from "react";
import { Button } from 'react-native-elements';
import { Text, StyleSheet } from "react-native";

const MyBooksScreen = ({ navigation }) => {
    return <>
        <Button title='Book' onPress={() => navigation.navigate('Book')} />
        <Text>Delete Book</Text>
        <Button title='Create a Book' onPress={() => navigation.navigate('NewBook')} />
    </>
};

const styles = StyleSheet.create({});

export default MyBooksScreen;

//CREATE A SINGLE COMPONENT FOR MYBOOKS AND NOTES!