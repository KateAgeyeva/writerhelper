import React from "react";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Spacer from '../components/Spacer';
import { signout } from "../store/authSlice";
import SubmitBtn from "../components/SubmitBtn";

const SignoutScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const logout = async () => {
      await AsyncStorage.removeItem('token');
      dispatch(signout());
      navigation.navigate('Signup');
  };
    
    return (
      <SafeAreaView forceInset={{ top: 'always' }}>
            <Spacer>
            <SubmitBtn btnText='Sign Out' onSubmit={logout} />
        </Spacer>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default SignoutScreen;