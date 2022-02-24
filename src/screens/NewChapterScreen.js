//findAndUpdate with post for editing

import React, { useState } from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import bookApi from '../api/index';
import SubmitBtn from "../components/SubmitBtn";
import Spacer from "../components/Spacer";

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
        await bookApi.post(`/books/${id}/chapters`, {
          chapterName,
          chapterDescription,
          chapterText
        });
        navigation.navigate("Book", { _id: id });
      };

    return (
      <KeyboardAwareScrollView>
        <SafeAreaProvider>
          <Spacer />
          <Input
            label="Name"
            autoCorrect={false}
            value={chapterName}
            onChangeText={(text) => setChapterName(text)}
            multiline
          />
          <Input
            label="Description"
            value={chapterDescription}
            onChangeText={(text) => setChapterDescription(text)}
            multiline
          />
          <Input
            label="Text"
            value={chapterText}
            onChangeText={(text) => setChapterText(text)}
            multiline
          />
          <SubmitBtn btnText="Save" onSubmit={() => createChapter(id)} />
        </SafeAreaProvider>
      </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({});

export default NewChapterScreen;

