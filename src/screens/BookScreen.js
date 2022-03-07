//Loading chapters spinner
//Fix ListItem and ScrollView
import React, { useEffect, useState } from "react";
import { Text } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, View, FlatList, Alert, LogBox, Platform  } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from "react-native-elements";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import bookApi from '../api/index';
import Spacer from "../components/Spacer";
import { fetch_chapters, delete_chapter } from "../store/chapterSlice";
import SubmitBtn from "../components/SubmitBtn";
import CancelBtn from "../components/CancelBtn";
import BookInput from "../components/BookInput";

const BookScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editBook, setEditBook] = useState(false);

  const state = useSelector((state) => state.book);
  const stateCh = useSelector((state) => state.chapter);
  const dispatch = useDispatch();

  const { _id } = route.params;
  const book = state.find((t) => t._id === _id);
  const name = book.name;
  const description = book.bookDescription;
  const characters = book.characters;
  const inspiration = book.inspiration;
  const id = book._id;

  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [editCharacters, setEditCharacters] = useState(characters);
  const [editInspiration, setEditInspiration] = useState(inspiration);

  const fetchChapters = async () => {
    const response = await bookApi.get(`/books/${id}/chapters`);
    dispatch(fetch_chapters(response.data));
    setIsLoading(true);
  };

  const deleteBook = async (id) => {
    await bookApi.delete(`/books/${id}`);
    navigation.navigate('MyBooks');
  };

  const deleteChapter = async (chapterId) => {
    await bookApi.delete(`/books/${id}/chapters/${chapterId}`);
    dispatch(delete_chapter(chapterId));
    setIsLoading(true);
  };

  const updateBook = async (id) => {
    await bookApi.post(`/books/${id}`, {
      name: editName,
      bookDescription: editDescription,
      characters: editCharacters,
      inspiration: editInspiration,
    });
    alert('Changes saved')
    navigation.navigate("MyBooks");
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, []);

  useEffect(() => {
    const booklist = navigation.addListener('focus', () => {
    fetchChapters();
    });
    return booklist;
  }, [navigation]);

  const deleteChapterAlert = (chapterId) => {
    Alert.alert (
      'Delete',
      'Are you sure you want to delete this chapter?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            deleteChapter(chapterId);
          }
        }
      ]
    )
  };

  const deleteBookAlert = (id) => {
    Alert.alert (
      'Delete',
      'Are you sure you want to delete this book?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => deleteBook(id)
        }
      ]
    )
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaProvider>
        {editBook && (
          <View>
            <BookInput labelName='Name' labelDescription='Description' labelCharacters='Characters' labelInspiration='Inspiration' nameText={editName} descriptionText={editDescription} charactersText={editCharacters} inspirationText={editInspiration} nameChange={setEditName} descriptionChange={setEditDescription} charactersChange={setEditCharacters} inspirationChange={setEditInspiration} />
              <SubmitBtn btnText="Save" onSubmit={() => updateBook(id)} />
              <CancelBtn btnText="Cancel" onSubmit={() => setEditBook(false)} />
          </View>
        )}
        {!editBook && (
          <View style={styles.bookFields}>
            <MaterialCommunityIcons
              style={styles.bookName}
              name="book-open-page-variant"
              size={24}
              color="black"
            />
            <Text style={styles.bookName} h4>
              {name}
            </Text>
            <Spacer />
            <Text style={styles.bookLableFont}>Description:</Text>
            <Text style={styles.bookFieldsFont}>{description}</Text>
            <Text style={styles.bookLableFont}>Characters:</Text>
            <Text style={styles.bookFieldsFont}>{characters}</Text>
            <Text style={styles.bookLableFont}>Inspiration:</Text>
            <Text style={styles.bookFieldsFont}>{inspiration}</Text>
            <SubmitBtn btnText="Edit" onSubmit={() => setEditBook(true)} />
          </View>
        )}
        <Spacer />
        <View style={styles.chapters}>
          <Text h4>Chapters:</Text>
          <TouchableOpacity
            style={styles.addChapter}
            onPress={() => navigation.navigate("NewChapter", { _id: id })}
          >
            <MaterialCommunityIcons
              name="text-box-plus"
              size={40}
              color="black"
            />
            <Text>Add Chapter</Text>
          </TouchableOpacity>
        </View>
        {isLoading && (
          <FlatList
            data={stateCh}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ChapterName", {
                      _id: item._id,
                      bookId: _id,
                    })
                  }
                >
                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{item.chapterName}</ListItem.Title>
                    </ListItem.Content>
                    <TouchableOpacity
                      onPress={() => deleteChapterAlert(item._id)}
                    >
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </ListItem>
                </TouchableOpacity>
              );
            }}
          />
        )}
        <Spacer />
        <SubmitBtn
          btnText="Notes"
          onSubmit={() => navigation.navigate("Notes", { _id: id })}
        />
        <Spacer />
        <TouchableOpacity onPress={() => deleteBookAlert(id)}>
          <Text
            style={{ color: "blue", alignSelf: "center" }}
          >{`Delete "${name}"`}</Text>
        </TouchableOpacity>
        <Spacer />
      </SafeAreaProvider>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  bookFields: {
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  bookName: {
    alignSelf: 'center',
    textAlign: 'center'
  },
  bookFieldsFont: {
    fontSize: 18,
    marginBottom: 8
  },
  bookLableFont: {
    fontStyle: 'italic'
  },
  chapters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  addChapter: {
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default BookScreen;

