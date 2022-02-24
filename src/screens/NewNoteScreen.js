import React, { useState } from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import bookApi from '../api/index';
import SubmitBtn from "../components/SubmitBtn";
import Spacer from "../components/Spacer";


const NewNoteScreen = ({ navigation, route }) => {
    const [note, setNote] = useState('');
    const state = useSelector((state) => state.book );

    const { _id } = route.params;
    const book = state.find((t) => t._id === _id);
    const id = book._id;


    const createNote = async (id) => {
        await bookApi.post(`/books/${id}/notes`, {
            note
        });
        navigation.navigate("Notes", { _id: id });
    }

    return (
      <KeyboardAwareScrollView>
          <SafeAreaProvider>
            <Spacer />
            <Input
              label="Text"
              value={note}
              onChangeText={(text) => setNote(text)}
              multiline
            />
            <SubmitBtn btnText="Save" onSubmit={() => createNote(id)} />
          </SafeAreaProvider>
      </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({});

export default NewNoteScreen;

