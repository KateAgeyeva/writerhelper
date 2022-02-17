//findAndUpdate with post for editing

import React, { useState } from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import bookApi from '../api/index';
import { add_chapter } from '../store/bookSlice';

const NewChapterScreen = ({ navigation, route }) => {
    const [chapterName, setChapterName] = useState('');
    const [chapterDescription, setChapterDescription] = useState('');
    const [chapterText, setChapterText] = useState('');

    const state = useSelector((state) => state.book );
    const dispatch = useDispatch();

    const { _id } = route.params;
    const book = state.find((t) => t._id === _id);
    const id = book._id;

    const createChapter = async (id) => {
        await bookApi.post(`/books/${id}`, {
          chapterName,
          chapterDescription,
          chapterText
        });
        navigation.navigate("Book", { _id: id });
      };

    return <>
        <Input label='Name' autoCorrect={false} value={chapterName} onChangeText={(text) => setChapterName(text)} />
        <Input label='Description' autoCorrect={false} value={chapterDescription} onChangeText={(text) => setChapterDescription(text)} />
        <Input label='Text' autoCorrect={false} value={chapterText} onChangeText={(text) => setChapterText(text)} />
        <Button title='Save' onPress={() => createChapter(id)} />
    </>
};

const styles = StyleSheet.create({});

export default NewChapterScreen;

