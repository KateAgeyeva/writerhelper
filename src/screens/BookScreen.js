import React, { useEffect, useState } from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from "react-native-elements";

import { delete_book, fetch_books } from '../store/bookSlice';
import bookApi from '../api/index';
import Spacer from "../components/Spacer";
import NavLink from "../components/NavLink";
import { fetch_chapters } from "../store/chaptersSlice";

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
  const chapters = book.chapters

  const deleteBook = async (id) => {
    await bookApi.delete(`/books/${id}`);
    dispatch(delete_book(id));
    navigation.navigate('MyBooks');
  };

  useEffect(() => {
    const booklist = navigation.addListener('focus', () => {
      fetchChapters();
    });
    return booklist;
  }, [navigation]);

  const fetchChapters = async () => {
    const response = await bookApi.get(`/books/${id}`);
    dispatch(fetch_chapters(response.data));
    setIsLoading(true);
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
                  <ListItem.Title>{item.chapterName}</ListItem.Title>
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
      <Button title="Notes" onPress={() => navigation.navigate("Notes")} />
      <Spacer />
      <TouchableOpacity onPress={() => deleteBook(id)}>
        <Text style={{ color: 'blue' }}>{`Delete ${name}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BookScreen;

