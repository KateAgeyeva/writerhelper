import React, { useState } from "react";
import { Input } from 'react-native-elements';
import { StyleSheet } from "react-native";
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import bookApi from '../api/index';
import SubmitBtn from "../components/SubmitBtn";
import CancelBtn from "../components/CancelBtn";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";


const EditNoteScreen = ({ navigation, route }) => {
    const state = useSelector((state) => state.note );

    const { _id } = route.params;
    const { bookId } = route.params;
    const note = state.find((t) => t._id === _id);
    const text = note.note;

    const [editNote, setEditNote] = useState(text);


    const updateNote = async (bookId, _id) => {
        await bookApi.post(`/books/${bookId}/notes/${_id}`, {
            note: editNote
        });
        alert('Changes saved');
        navigation.navigate("Notes", { _id: bookId });
    }

    return (
      <KeyboardAwareScrollView>
          <SafeAreaProvider>
            <Spacer />
            <Input
              label="Text"
              value={editNote}
              onChangeText={setEditNote}
              multiline
            />
            <SubmitBtn btnText="Save" onSubmit={() => updateNote(bookId, _id)} />
            <CancelBtn
              btnText="Cancel"
              onSubmit={() => navigation.navigate("Notes", { _id: bookId })}
            />
          </SafeAreaProvider>
      </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({});

export default EditNoteScreen;

