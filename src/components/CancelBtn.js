import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet } from "react-native";

const CancelBtn = ({ onSubmit, btnText }) => {
    return (
      <Button
        buttonStyle={{
          backgroundColor: "white",
          borderRadius: 30,
        }}
        containerStyle={{
        //   width: 150,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ 
          fontWeight: "bold", 
          color: "black" 
        }}
        title={btnText}
        onPress={() => onSubmit()}
      />
    );
};

const styles = StyleSheet.create({});

export default CancelBtn;

