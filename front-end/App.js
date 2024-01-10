import * as React from 'react';
import { LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View,ActivityIndicator } from 'react-native';
import { AuthContext } from './components/context';
import RootStackScreen from './screen/RootStackScreen/RootStackScreen';
import HomeScreen from "./screen/HomeScreen/HomeScreen.js"
import SearchStackScreen from './screen/SearchStackScreen/SearchStackScreen';
import ProfileStackScreen from './screen/ProfileStackScreen/ProfileStackScreen';
import FavouritePage from "./screen/FavouritePage/FavouritePage.js"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios';
import { tsRestType } from '@babel/types';
const Drawer = createDrawerNavigator();
function App() {
  // const [isLoading,setIsLoading] = React.useState(true);
  // const [userToken,setUserToken] = React.useState(null);
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const initialLoginState ={
    isLoading:true,
    userName: null,
  }
  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_USER': 
        return {
          ...prevState,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);
  const authContext = React.useMemo(()=>({
    logIn:async (userData)=>{
      const email =  userData.email;
      const lastName = userData.lastName;
      const firstName = userData.firstName;
      try{
        await AsyncStorage.multiSet([['email',email],['lastName',lastName],['firstName',firstName]]);
      }catch(e){
        console.log(e)
      }
      dispatch({type:'LOGIN',id:email});
    },
    logOut:async()=>{
      try{
        await AsyncStorage.multiRemove(['email','lastName','firstName'])
      }catch(e){
        console.log(e);
      }
      dispatch({type:"LOGOUT"})
    },
    register:()=>{
      // setUserToken("fdsaf");
      // setIsLoading(false);
    }
  }))
  React.useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('email');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_USER' });
    }, 1000);
  }, []);
  if(loginState.isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

const Tab = createMaterialBottomTabNavigator();

function MainTabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: '#0a64f5' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="database-search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouritePage}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userName!= null? (
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Main Screen" component={MainTabScreen} />
          </Drawer.Navigator>
          ):
        <RootStackScreen/>}   
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;