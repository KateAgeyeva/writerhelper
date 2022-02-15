import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { signin } from '../store/authSlice';

const ResolveAuthScreen = ({ navigation }) => {
    // const state = useSelector((state) => state.auth.errorMessage);
    const dispatch = useDispatch();

    const tryLocalSignin = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          dispatch(signin(token));
          navigation.navigate("MyBooks");
        } else {
          navigation.navigate("Signup");
        }
      };

    useEffect(()=>{
        tryLocalSignin();
    }, []);

    return null;
};

export default ResolveAuthScreen;