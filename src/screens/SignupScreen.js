// CHECK CLEAR ERROR FUNCTION

import React, { useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AuthForm from "../components/AuthForm";
import NavLink from '../components/NavLink';
import { signin, add_error, clear_err_message } from "../store/authSlice";
import bookApi from '../api/index';

const SignupScreen = ({ navigation }) => {
  const state = useSelector((state) => state.auth.errorMessage);
  const dispatch = useDispatch();

  const signup = async ({ email, password }) => {
    try {
      const response = await bookApi.post("/signup", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch(signin(response.data.token));
      navigation.navigate("MyBooks");
    } catch (err) {
      dispatch(add_error("Something went wrong with sign up"));
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
          headerText="Sign Up to Write"
          errorMessage={state}
          submitButtonText="Sign Up"
          onSubmit={signup}
        />
        <NavLink name="Signin" text="Already have an account? Sign in instead" />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
    marginTop: 30,
  },
});

export default SignupScreen;