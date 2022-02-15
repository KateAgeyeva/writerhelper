//useReducer insted of useState;
import React, { useState } from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";

import bookApi from '../api/index';
import Spacer from '../components/Spacer';

const NewBookScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [characters, setCharacters] = useState('');
    const [inspiration, setInspiration] = useState('');

    const createBook = async () => {
        await bookApi.post("/books", {
          name,
          bookDescription,
          characters,
          inspiration,
        });
        navigation.navigate("Book");
      };

    return (
        <>
          <Spacer />
          <Input
            label="Name"
            value={name}
            autoCorrect={false}
            onChangeText={(text) => setName(text)}
          />
          <Input
            label="Description"
            value={bookDescription}
            autoCorrect={false}
            onChangeText={(text) => setBookDescription(text)}
          />
          <Input
            label="Characters"
            value={characters}
            autoCorrect={false}
            onChangeText={(text) => setCharacters(text)}
          />
          <Input
            label="Inspiration"
            value={inspiration}
            autoCorrect={false}
            onChangeText={(text) => setInspiration(text)}
          />
          <Button
            title="Create"
            onPress={createBook}
          />
        </>
      );
};

const styles = StyleSheet.create({});

export default NewBookScreen;

