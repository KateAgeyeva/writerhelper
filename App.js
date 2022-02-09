import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BookScreen from './src/pages/BookScreen';
import ChapterNameScreen from './src/pages/ChapterNameScreen';
import MyBooksScreen from './src/pages/MyBooksScreen';
import NewBookScreen from './src/pages/NewBookScreen';
import NewChapterScreen from './src/pages/NewChapterScreen';
import NewNoteScreen from './src/pages/NewNoteScreen';
import NotesScreen from './src/pages/NotesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MyBooks" component={MyBooksScreen} />
        <Stack.Screen name="NewBook" component={NewBookScreen} />
        <Stack.Screen name="Book" component={BookScreen} />
        <Stack.Screen name="BookFlow" component={BookFlow} />
        <Stack.Screen name="NotesFlow" component={NotesFlow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BookFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChapterName" component={ChapterNameScreen} />
      <Stack.Screen name="NewChapter" component={NewChapterScreen} />
      <Stack.Screen />
    </Stack.Navigator>
  );
};

const NotesFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="NewNote" component={NewNoteScreen} />
    </Stack.Navigator>
  );
};

export default () => {
  return <App />
};

