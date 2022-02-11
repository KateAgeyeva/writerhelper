//Forgot password - send by email
//Share or save chapters-book

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from './src/store/index';
import { Provider } from 'react-redux';

import BookScreen from './src/screens/BookScreen';
import ChapterNameScreen from './src/screens/ChapterNameScreen';
import MyBooksScreen from './src/screens/MyBooksScreen';
import NewBookScreen from './src/screens/NewBookScreen';
import NewChapterScreen from './src/screens/NewChapterScreen';
import NewNoteScreen from './src/screens/NewNoteScreen';
import NotesScreen from './src/screens/NotesScreen';
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="MyBooks" component={MyBooksScreen} />
        <Stack.Screen name="NewBook" component={NewBookScreen} />
        <Stack.Screen name="Book" component={BookScreen} />
        <Stack.Screen name="ChapterName" component={ChapterNameScreen} />
        <Stack.Screen name="NewChapter" component={NewChapterScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="NewNote" component={NewNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
