import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AccountProfile from '../AccountProfile/AccountProfile';
import AccountProfileChange from '../AccountProfile/AccountProfileChange';
import ChangeUserName from '../AccountProfile/ChangeUserName';
import PostSellInfo from '../AccountProfile/PostSellInfo';
import AccountProfile2 from '../AccountProfile/AccountProfile2';
const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator headerMode='none'>
        <ProfileStack.Screen name="Profile" component={AccountProfile}/>
        <ProfileStack.Screen name="Profile2" component={AccountProfile2}/>
        <ProfileStack.Screen name="ProfileChange" component={AccountProfileChange}/>
        <ProfileStack.Screen name="ChangeUserName" component={ChangeUserName}/>
        <ProfileStack.Screen name="PostSellInfo" component={PostSellInfo}/>
    </ProfileStack.Navigator>
);

export default ProfileStackScreen;