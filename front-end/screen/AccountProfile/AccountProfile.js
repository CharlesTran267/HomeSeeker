import React, { Component, useContext, useEffect,useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Button from 'react-native-button';
import { Dimensions } from 'react-native';

import { AuthContext } from '../../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height, scale} = Dimensions.get('window')


function AccountProfile({navigation}) {
        const {logOut} = useContext(AuthContext)
        const [firstName,setFirstName] = useState('')
        const [lastName,setLastName] = useState('')
        const getData = async (key) => {
            let value;
            value = null;
            try {
                value = await AsyncStorage.getItem(key);
            } catch(e) {
              console.log(e);
            }
            key=="firstName" ? setFirstName(value):setLastName(value)
          }
        useEffect(()=>{
            getData("firstName");
            getData('lastName')
        },[])
        return (
        <View style={styles.rootView}>

            <View style={styles.Photo}>
                <Image style={styles.stretch}
                    source={require('../../assets/defaultProfile.png')}/>
            </View>
            
            <View style={styles.nickname}>
            
                <Button 
                onPress={() => navigation.navigate('ProfileChange',{firstName:firstName,lastName:lastName})}
                style={{ fontSize: 25, color: 'black', fontFamily: 'TimesNewRoman'}}> {firstName} {lastName}  {'>'}
                </Button>
        
            </View>

            <View style={styles.sellbutton}>
            
                <Button 
                onPress={() => {navigation.navigate("PostSellInfo");}}
                style={{ fontSize: 20, color: 'white'}}>
                Sell my house!
                </Button>
     
            </View>

            <View style={styles.logoutbutton}>
            
                <Button 
                onPress={()=>{logOut()}}
                style={{ fontSize: 20, color: 'black'}}>
                Log Out
                </Button>
     
            </View>

           
         </View> 
      

    )
  }
  export default AccountProfile;

const styles = StyleSheet.create({
    rootView:{
        backgroundColor:'white',
        flex:1
    },
    Photo:{
        
        marginTop:50,
        marginHorizontal:50,
        // 设置内间距
        //padding: 10,
        // 设置宽度
        width:10,
        height:10,
        borderRadius:8,
        //overflow:'hidden'
    },
    stretch: {
        width: 70,
        height: 70,
        resizeMode: 'stretch',
    },
    nickname: {
        backgroundColor:'white',
        marginTop:10,
        marginLeft: 160,
        height:30,
        width: 200,
        borderRadius:8,
        overflow:'hidden'
    },
    sellbutton:{
        backgroundColor:'orange',
        // 设置底部边框,一定要设置宽度才行
        //borderBottomColor:'yellow',
        //borderBottomWidth:2,
        // 设置外间距
        marginTop:100,
        marginHorizontal:50,
        // 设置内间距
        padding: 10,
        // 设置宽度
        //width:350,
        height:50,
        borderRadius:8,
        overflow:'hidden'
    },
    rentbutton:{
        backgroundColor:'dodgerblue',
        // 设置底部边框,一定要设置宽度才行
        //borderBottomColor:'yellow',
        //borderBottomWidth:2,
        // 设置外间距
        marginTop:40,
        marginHorizontal:50,
        // 设置内间距
        padding: 10,
        // 设置宽度
        //width:350,
        height:50,
        borderRadius:8,
        overflow:'hidden'
    },
    logoutbutton:{
        backgroundColor:'white',
        // 设置底部边框,一定要设置宽度才行
        //borderBottomColor:'yellow',
        //borderBottomWidth:2,
        borderColor:'black',
        borderWidth:1,
        // 设置外间距
        marginTop:80,
        marginHorizontal:50,
        // 设置内间距
        padding: 10,
        // 设置宽度
        //width:350,
        height:50,
        borderRadius:8,
        overflow:'hidden'
    }

});


