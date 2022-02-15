import React, { useEffect } from "react";
import { Button } from 'react-native-elements';
import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { useSelector, useDispatch } from 'react-redux';

import NavLink from "../components/NavLink";
import Spacer from '../components/Spacer';
import bookApi from '../api/index';
import { fetch_books } from "../store/bookSlice";

const MyBooksScreen = ({ navigation }) => {
    const state = useSelector((state) => state.book);
    const dispatch = useDispatch();

    const fetchBooks = async () => {
        const response = await bookApi.get("/books");
        dispatch(fetch_books(response.data));
      }

    useEffect(() => {
        fetchBooks();
    }, []);

    console.log(state);

    return (
      <>
        <Spacer />
        <Text>My Books</Text>
        <FlatList
          data={state}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('Book', { _id: item._id })}>
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>
            );
          }}
        />
        <Button
          title="Create a Book"
          onPress={() => navigation.navigate("NewBook")}
        />
        <NavLink text="Sign out from your account" name="Signout" />
      </>
    );
};

const styles = StyleSheet.create({});

export default MyBooksScreen;

//CREATE A SINGLE COMPONENT FOR MYBOOKS AND NOTES!