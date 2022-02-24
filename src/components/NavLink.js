import React from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Spacer from "./Spacer";
import { useNavigation } from "@react-navigation/native";

const NavLink = ({ text, name }) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(name)}>
        <Spacer>
          <Text style={styles.link}>
            {text}
          </Text>
        </Spacer>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    link: {
        color: 'blue'
      },
      container: {
        alignItems: 'center'
      }
});

export default NavLink;