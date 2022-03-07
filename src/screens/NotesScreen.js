import React, { useEffect, useState } from "react";
import { ListItem } from 'react-native-elements';
import { StyleSheet, FlatList, TouchableOpacity, Alert, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useSelector, useDispatch } from "react-redux";
import bookApi from '../api/index';
import { fetch_notes, delete_note } from "../store/noteSlice";
import SubmitBtn from "../components/SubmitBtn";

const NotesScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state.book);
  const stateN = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const { _id } = route.params;
  const book = state.find((t) => t._id === _id);
  const id = book._id;

  const fetchNotes = async () => {
    const response = await bookApi.get(`/books/${id}/notes`);
    dispatch(fetch_notes(response.data));
    setIsLoading(true);
  };

  const deleteNote = async (noteId) => {
    await bookApi.delete(`/books/${id}/notes/${noteId}`);
    dispatch(delete_note(noteId));
    setIsLoading(true);
  };

  useEffect(() => {
    const notelist = navigation.addListener("focus", () => {
      fetchNotes();
    });
    return notelist;
  }, [navigation]);

  const deleteNoteAlert = (noteId) => {
    Alert.alert("Delete", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancelled"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          deleteNote(noteId);
        },
      },
    ]);
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaProvider>
        <SubmitBtn
          btnText="Add a Note"
          onSubmit={() => navigation.navigate("NewNote", { _id: id })}
        />
        {isLoading && (
          <View>
            <FlatList
              data={stateN}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return (
                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{item.note}</ListItem.Title>
                    </ListItem.Content>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("EditNote", {
                          _id: item._id,
                          bookId: _id,
                        })
                      }
                    >
                      <MaterialCommunityIcons
                        name="pencil"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteNoteAlert(item._id)}>
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </ListItem>
                );
              }}
            />
          </View>
        )}
      </SafeAreaProvider>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({});

export default NotesScreen;

