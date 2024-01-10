import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Search from '../SearchPage/SearchPage';
import FilterScreen_buy from '../FilterScreen/FilerScreen_buy';
import ComInfo from '../ComInfo/ComInfo';
const SearchStack = createStackNavigator();

const SearchStackScreen = ({navigation}) => (
    <SearchStack.Navigator headerMode='none'>
        <SearchStack.Screen name="Search" component={Search}/>
        <SearchStack.Screen name="Filter" component={FilterScreen_buy}/>
        <SearchStack.Screen name="Community" component={ComInfo}/>
    </SearchStack.Navigator>
);

export default SearchStackScreen;