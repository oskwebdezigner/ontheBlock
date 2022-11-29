import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeReducer = (state, action) => {
    switch (action.type) {
        case 'Yellow':
            AsyncStorage.setItem('theme', 'Yellow')
            return 'Yellow';
        default:
            AsyncStorage.setItem('theme', 'Yellow')
            return 'Yellow';
    }
}
export default ThemeReducer