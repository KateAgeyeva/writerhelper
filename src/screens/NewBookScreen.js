//useReducer insted of useState;
import React, { useState } from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet, View
  // KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard  
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import bookApi from '../api/index';
import Spacer from '../components/Spacer';
import SubmitBtn from "../components/SubmitBtn";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
                <Input
                  label="Name"
                  value={name}
                  autoCorrect={false}
                  onChangeText={(text) => setName(text)}
                  multiline
                />
                <Input
                  label="Description"
                  value={bookDescription}
                  onChangeText={(text) => setBookDescription(text)}
                  multiline
                />
                <Input
                  label="Characters"
                  value={characters}
                  autoCorrect={false}
                  onChangeText={(text) => setCharacters(text)}
                  multiline
                />
                <Input
                  label="Inspiration"
                  value={inspiration}
                  onChangeText={(text) => setInspiration(text)}
                  multiline
                />
                <SubmitBtn 
                  btnText='Create'
                  onSubmit={createBook}
                />
                {/* <Button
                  buttonStyle={{ backgroundColor: "#18191A" }}
                  titleStyle={{ color: 'orange' }}
                  title="Create"
                  onPress={createBook}
                /> */}
              </SafeAreaProvider>
            </KeyboardAwareScrollView>
        //   </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
      );
};

const styles = StyleSheet.create({});

export default NewBookScreen;

