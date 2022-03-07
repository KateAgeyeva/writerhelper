import React, { useState } from "react";
import { StyleSheet
  // KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard  
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider } from "react-native-safe-area-context";

import bookApi from '../api/index';
import Spacer from '../components/Spacer';
import SubmitBtn from "../components/SubmitBtn";
import BookInput from "../components/BookInput";

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
        navigation.navigate("MyBooks");
      };

    return (
            <KeyboardAwareScrollView>
              <SafeAreaProvider>
                <Spacer />
                <BookInput labelName='Name' labelDescription='Description' labelCharacters='Characters' labelInspiration='Inspiration' nameText={name} descriptionText={bookDescription} charactersText={characters} inspirationText={inspiration} nameChange={(text) => setName(text)} descriptionChange={(text) => setBookDescription(text)} charactersChange={(text) => setCharacters(text)} inspirationChange={(text) => setInspiration(text)} />
                <SubmitBtn 
                  btnText='Create'
                  onSubmit={createBook}
                />
              </SafeAreaProvider>
            </KeyboardAwareScrollView>
        //   </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
      );
};

const styles = StyleSheet.create({});

export default NewBookScreen;

