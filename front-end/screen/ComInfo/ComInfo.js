import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, FlatList, Image, SafeAreaView, TouchableOpacity} from "react-native";

import openMap from 'react-native-open-maps';
import { useState } from 'react/cjs/react.development';

export default function ComInfo ({navigation,route}){
    const data = route.params
    const _goToYosemite =()=> {
        openMap({ latitude: 1.344627, longitude: 103.713380 });
    }
    const [liked,setLiked] = useState(false)

    const handlePress = ()=>{
        setLiked(!liked);
        // async function setFav(){
        //     let value;
        //     value=[]
        //     try{
        //         value = await AsyncStorage.getItem("favorite")
        //         let newValue=[...value]
        //         newValue.push({
        //             image: data.image,
        //             comName:data.comName,
        //             address:data.address,
        //             price: data.price,
        //             name:data.name,
        //             floorArea:`${data.floorArea}m^2`,
        //             contactNo:data.contactNo
        //         })
        //         console.log(newValue);
        //         await AsyncStorage.setItem("favourite",newValue)
        //     }catch(e){console.log(e);}
        // }
        // setFav()

    }
    return (        
        <View style={styles.container}>

            <View style={styles.backArrow}>
                <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
                        <Image source={require("../../res/angle-left.png")} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            </View>

            <View style={styles.picture}>
                <Image source={data.image} style={styles.comPic}/>
            </View>

            {/* community information */}
            <View style={styles.cominfor}>
                <Text style={styles.comName}>{data.comName}</Text>
                <View style={styles.comLoc}>
                    <Text style={styles.loc}>{data.address}</Text>
                    <Text style={styles.price}>{data.price}</Text>
                </View>
                <Text style={styles.des}></Text>
            </View>

            {/* location and fav buttons */}
            <View style={styles.twoButton}>
                <View style={styles.locButton}>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={_goToYosemite}>
                            
                            <Image source={require('../../assets/loc.jpg')} style={styles.image}/>

                        </TouchableOpacity>
                    </View>
                    <Text style={styles.buttonText}>Location</Text>
                </View>  
                <View style={styles.favButton}>
                    <TouchableOpacity onPress={()=>handlePress()}>
                        {liked?<Image source={require('../../assets/red.jpg')} style={styles.image}/>:
                        <Image source={require('../../assets/black.jpg')} style={styles.image}/>}
                        
                    </TouchableOpacity>
                    <Text style={styles.buttonText}>Favorite</Text>
                </View>                 
            </View>

            {/* buy and rent */}
            {/* <View style={styles.twoChoice}>
                <View style={{ width:200, borderColor:"grey",borderWidth:2, flex:1, alignItems:"center", justifyContent:"center" }}>
                    <Text style={{fontSize:30}}>Buy</Text>
                </View>
                <View style={{ width:200,borderColor:"grey",borderWidth:2 ,flex:1, alignItems:"center", justifyContent:"center" }}>
                    <Text style={{fontSize:30}}>Rent</Text>
                </View>
            </View> */}
            <View style={{height:100, backgroundColor:"#fffff3", padding: 10}}>
                <Text style={styles.des}>{data.floorArea}</Text>
                <Text style={styles.des}>{data.name} </Text>
                <Text style={styles.des}>Contact Number: {data.contactNo}</Text>

            </View>
            
        </View>
    );}
const styles = StyleSheet.create({
    comPic:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    image:{
        width: 60,
        height: 60,
    },
    container:{
        flexDirection: "column",     
        marginTop: 55,
    },
    backArrow:{
        //backgroundColor: "yellow",
        height:40,
        width: 50,
    },
    picture:{         
        backgroundColor: "black",  
        height:200,                
    },
    cominfor:{         
        // backgroundColor: "gold",  
        // height:150, 
        margin: 10,        
    },
    comName:{         
        color: "black",  
        fontSize: 20,   
        fontWeight: "bold",
        fontFamily: 'normal',   
    },
    comLoc:{         
        height: 35,
        // backgroundColor: "red",
        flexDirection: "row",
    },
    loc:{
        color: "grey",
        fontSize: 15,
    },
    price:{
        color: "grey",
        fontSize: 15,
        left: 50,
    },
    des:{
        color: "black",
        fontSize:15,
    },
    twoButton:{
        // backgroundColor: "blue",
        height: 100,
        flexDirection: "row",
        borderColor: "grey",
        borderWidth: 2,
    },
    locButton:{
        //backgroundColor:"#ff0067",
        flex:1, 
        alignItems: "center",   
        padding: 5,
    },
    favButton:{
        //backgroundColor:"tomato",
        alignItems: "center",
        flex:1, 
        padding: 5,  
    },
    button:{
        //backgroundColor: "yellow",
        height: 65,
        width: 50,
    },
    buttonText:{
        color: "black",
        fontSize: 15,
    },
    twoChoice:{
        //backgroundColor: "blue",
        height: 60,
        flexDirection: "row",
    }

})






