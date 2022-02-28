import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";

const ChapterInput = ({ labelName, labelDescription, labelText, nameText, descriptionText, textText, nameChange, descriptionChange, textChange }) => {
    return (
      <View>
        <Input
          label={labelName}
          value={nameText}
          autoCorrect={false}
          onChangeText={nameChange}
          multiline
        />
        <Input
          label={labelDescription}
          value={descriptionText}
          onChangeText={descriptionChange}
          multiline
        />
        <Input
          label={labelText}
          value={textText}
          autoCorrect={false}
          onChangeText={textChange}
          multiline
        />
      </View>
    );
};

const styles = StyleSheet.create({});

export default ChapterInput;