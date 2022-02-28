import React, { useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { signin, add_error, clear_err_message } from "../store/authSlice";
import bookApi from '../api/index';


const SigninScreen = ({ navigation }) => {
  const state = useSelector((state) => state.auth.errorMessage);
  const dispatch = useDispatch();

  const login = async ({ email, password }) => {
    try {
      const response = await bookApi.post("/signin", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(signin(response.data.token));
      navigation.navigate("MyBooks");
    } catch (err) {
      dispatch(add_error("Something went wrong with sign in"));
    }
  };

  const clearErrorMessage = () => {
    dispatch(clear_err_message());
  };

  useEffect(() => {
    const clearErr = navigation.addListener("blur", () => {
      clearErrorMessage();
    });
    return clearErr;
  }, [navigation]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <AuthForm
          headerText="Sign In to Your Account"
          errorMessage={state}
          onSubmit={login}
          submitButtonText="Sing In"
        />
        <NavLink text="Don't have an account? Sign up instead" name="Signup" />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 200,
  },
});

export default SigninScreen;