import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";

const BookInput = ({ labelName, labelDescription, labelCharacters, labelInspiration, nameText, descriptionText, charactersText, inspirationText, nameChange, descriptionChange, charactersChange, inspirationChange }) => {
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
          label={labelCharacters}
          value={charactersText}
          autoCorrect={false}
          onChangeText={charactersChange}
          multiline
        />
        <Input
          label={labelInspiration}
          value={inspirationText}
          onChangeText={inspirationChange}
          multiline
        />
      </View>
    );
};

const styles = StyleSheet.create({});

export default BookInput;