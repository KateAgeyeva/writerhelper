import React, { useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";

import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { signin, add_error } from "../store/authSlice";
import bookApi from '../api/index';


const SigninScreen = ({ navigation }) => {
  const state = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();

  const login = async ({ email, password }) => {
    try {
      const response = await bookApi.post("/signin", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(signin(response.data.token));
      navigation.navigate('MyBooks');
    } catch (err) {
      dispatch(add_error("Something went wrong with sign in"));
    }
  };
    
    useEffect(()=>{
        const clearErr = navigation.addListener('blur', () => {
            clearErrorMessage();
        });
        return clearErr;
    }, [navigation]);
    
    return (
      <View style={styles.container}>
        <AuthForm
          headerText="Sign In to Your Account"
          errorMessage={state.errorMessage}
          onSubmit={login}
          submitButtonText="Sing In"
        />
        <NavLink text="Dont have an account? Sign up instead" name="Signup" />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 200
      }
});

export default SigninScreen;