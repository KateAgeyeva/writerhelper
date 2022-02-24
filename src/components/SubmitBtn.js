import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet } from "react-native";

const SubmitBtn = ({ onSubmit, btnText }) => {
    return (
      <Button
        buttonStyle={{
          backgroundColor: "#18191A",
          borderRadius: 30,
        }}
        containerStyle={{
          // width: 150,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ 
          fontWeight: "bold", 
          color: "orange" 
        }}
        title={btnText}
        onPress={() => onSubmit()}
      />
    );
};

const styles = StyleSheet.create({});

export default SubmitBtn;

