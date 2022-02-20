//Loading chapters spinner
//Delete icon on a chpter
import React, { useEffect, useState } from "react";
import { Text, Button } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, View, FlatList, Alert } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from "react-native-elements";

import bookApi from '../api/index';
import Spacer from "../components/Spacer";
import NavLink from "../components/NavLink";
import { fetch_chapters, delete_chapter } from "../store/chapterSlice";

const BookScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);

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
    <View>
      <Spacer>
        <NavLink text='My Books' name='MyBooks' />
      </Spacer>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{characters}</Text>
      <Text>{inspiration}</Text>
      <Spacer>
      <Text>Chapters</Text>
      {isLoading && <FlatList
        data={stateCh}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("ChapterName", { _id: item._id })}
            >
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.chapterName}
                  <TouchableOpacity onPress={() => deleteChapterAlert(item._id)}><Text>Delete</Text></TouchableOpacity>
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />}
      </Spacer>
      <Spacer>
        <Button
          title="Add a Chapter"
          onPress={() => navigation.navigate("NewChapter", { _id: id })}
        />
      </Spacer>
      <Button title="Notes" onPress={() => navigation.navigate("Notes", { _id: id })} />
      <Spacer />
      <TouchableOpacity onPress={() => deleteBookAlert(id)}>
        <Text style={{ color: 'blue' }}>{`Delete ${name}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BookScreen;

