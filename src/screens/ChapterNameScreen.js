import React from "react";
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from "react-native";

import { useSelector } from 'react-redux';
import Spacer from "../components/Spacer";

const ChapterNameScreen = ({ navigation, route }) => {
  const state = useSelector((state) => state.chapter);

  const { _id } = route.params;
  const chapter = state.find((t) => t._id === _id);
  const name = chapter.chapterName;
  const text = chapter.chapterText;
  const description = chapter.chapterDescription;

  return (
    <>
      <Spacer />
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{text}</Text>
      {/* <Button title="Back to Book" onPress={() => navigation.navigate("Book")} /> */}
    </>
  );
};

const styles = StyleSheet.create({});

export default ChapterNameScreen;

