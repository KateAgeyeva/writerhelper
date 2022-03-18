import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import bookApi from '../api/index';
import SubmitBtn from "../components/SubmitBtn";
import Spacer from "../components/Spacer";
import ChapterInput from "../components/ChapterInput";

const NewChapterScreen = ({ navigation, route }) => {
    const [chapterName, setChapterName] = useState('');
    const [chapterDescription, setChapterDescription] = useState('');
    const [chapterText, setChapterText] = useState('');

    const state = useSelector((state) => state.book );

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
          <ChapterInput labelName='Name' labelDescription='Description' labelText='Text' nameText={chapterName} descriptionText={chapterDescription} textText={chapterText} nameChange={(text) => setChapterName(text)} descriptionChange={(text) => setChapterDescription(text)} textChange={(text) => setChapterText(text)} />
          <SubmitBtn btnText="Save" onSubmit={() => createChapter(id)} />
        </SafeAreaProvider>
      </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({});

export default NewChapterScreen;

