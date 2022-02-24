//CREATE A SINGLE COMPONENT FOR MYBOOKS AND NOTES!
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity, View } from "react-native";
import { ListItem, Header, HeaderProps } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import NavLink from "../components/NavLink";
import SubmitBtn from "../components/SubmitBtn";
import bookApi from '../api/index';
import { fetch_books } from "../store/bookSlice";

const MyBooksScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state.book);
  const dispatch = useDispatch();

  const fetchBooks = async () => {
    setIsLoading(true);
    const response = await bookApi.get("/books");
    dispatch(fetch_books(response.data));
  };

  useEffect(() => {
    const booklist = navigation.addListener('focus', () => {
      fetchBooks();
    });
    return booklist;
  }, [navigation]);

  return (
    <SafeAreaProvider>
      <Header backgroundColor="#8D9399" 
        centerComponent={
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons name="bookshelf" size={30} color="black" />
          <Text style={styles.heading}>My Books</Text>
        </View>}
        // leftComponent={<MaterialCommunityIcons name="bookshelf" size={30} color="black" />}
      />
      {isLoading &&
        <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Book", { _id: item._id })}
            >
              <ListItem topDivider>
              <MaterialCommunityIcons name="book-open-page-variant" size={24} color="black" />
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
      }
      <SubmitBtn
        btnText="Create Book"
        onSubmit={() => navigation.navigate("NewBook")}
      />
      <NavLink text="Sign out from your account" name="Signout" />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MyBooksScreen;