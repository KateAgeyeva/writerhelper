import React, { useState } from "react";
import { Text } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import Spacer from "../components/Spacer";
import bookApi from '../api/index';
import SubmitBtn from "../components/SubmitBtn";
import CancelBtn from "../components/CancelBtn";
import ChapterInput from "../components/ChapterInput";

const ChapterNameScreen = ({ navigation, route }) => {
  const state = useSelector((state) => state.chapter);
  const [editChapter, setEditChapter] = useState(false);

  const { _id } = route.params;
  const { bookId } = route.params;
  const chapter = state.find((c) => c._id === _id);
  const name = chapter.chapterName;
  const text = chapter.chapterText;
  const description = chapter.chapterDescription;

  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [editText, setEditText] = useState(text);
  
  const updateChapter = async (bookId, _id) => {
    await bookApi.post(`/books/${bookId}/chapters/${_id}`, {
      chapterName: editName,
      chapterDescription: editDescription,
      chapterText: editText
    });
    alert('Changes Saved');
    navigation.navigate('Book', { _id: bookId });
  };

  const shareChapter = async () => {
    const fileShareSchema = chapter.chapterText;
    await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + `MyChapter.docx`, JSON.stringify(fileShareSchema));
    const { uri } = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}/MyChapter.docx`);
    Sharing.shareAsync(uri);
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaProvider>
        <Spacer />
        {editChapter && (
          <View>
            <ChapterInput
              labelName="Name"
              labelDescription="Description"
              labelText="Text"
              nameText={editName}
              descriptionText={editDescription}
              textText={editText}
              nameChange={setEditName}
              descriptionChange={setEditDescription}
              textChange={setEditText}
            />
            <SubmitBtn
              btnText="Save"
              onSubmit={() => updateChapter(bookId, _id)}
            />
            <CancelBtn
              btnText="Cancel"
              onSubmit={() => setEditChapter(false)}
            />
          </View>
        )}
        {!editChapter && (
          <View>
            <Text style={styles.chapterName} h4>
              {name}
            </Text>
            <Spacer />
            <Text style={styles.chapterLableFont}>Description:</Text>
            <Text style={styles.chapterFieldsFont}>{description}</Text>
            <Text style={styles.chapterLableFont}>Text:</Text>
            <Text style={styles.chapterFieldsFont}>{text}</Text>
            <Spacer />
            <SubmitBtn btnText="Edit" onSubmit={() => setEditChapter(true)} />
          </View>
        )}
        <Spacer />
        <TouchableOpacity onPress={() => shareChapter()}>
          <Text style={{ color: "blue", alignSelf: "center" }}>
            Share the chapter
          </Text>
        </TouchableOpacity>
        <Spacer />
      </SafeAreaProvider>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  chapterName: {
    alignSelf: 'center',
    textAlign: 'center'
  },
  chapterLableFont: {
    fontStyle: 'italic'
  },
  chapterFieldsFont: {
    fontSize: 18,
    marginBottom: 8
  },
});

export default ChapterNameScreen;

