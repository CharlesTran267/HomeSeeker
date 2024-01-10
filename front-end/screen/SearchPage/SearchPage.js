import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, ScrollView } from 'react-native';
import iconFilter from "../../assets/icon_filter.png"
import { TouchableOpacity } from 'react-native-gesture-handler'
import House from '../../components/House';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios';
//import list from '../json/houseList.json'

const { width } = Dimensions.get("window")

export default function Search ({navigation,route}) {
    
    // console.log(filter)
    const [buttonClicked,setButtonCLicked] = useState(false)
    const [result,setResult] = useState([])
    const [search,setSearch] = useState("")
    const [searchSubmit,setSearchSubmit] = useState("")
    const [list,setList] = useState([
        {
            image: require("../../res/westwood.jpg"),
            comName: "Westwood Residences",
            address: "182 Westwood Ave ",
            price: "680k SGD",
            priceRange:"500k-1000k SGD",
            facilities:["School","Car Park"],
            location: "West SG",
            name: "Mr.Kevin",
            floorArea:"120m^2",
            contactNo:"88016910"

        },
        {
            image: require("../../res/lakeville.jpg"),
            comName: "Lakeville",
            address: "1 Jurong Lake Link",
            price: "820k SGD",
            priceRange:"500k-1000k SGD",
            facilities:["Car Park","Attractions"],
            location: "East SG",
            name: "Ms.Lim",
            floorArea:"110m^2",
            contactNo:"88016996"

        },
        {
            image: require("../../res/lakefront.jpg"),
            comName: "Lakefront Residences",
            address: "48 Lakeside Drive ",
            price: "750k SGD",
            priceRange:"500k-1000k SGD",
            facilities:["Food Court","Shopping Mall"],
            location: "East SG",
            name: "Mr.Charles",
            floorArea:"130m^2",
            contactNo:"88016997"
        },
        {
            image: require("../../res/caspian.jpg"),
            comName: "Caspian",
            address: "62 Lakeside Drive ",
            price: "629k SGD",
            priceRange:"500k-1000k SGD",
            facilities:["MRT station","Hospital"],
            location: "East SG",
            name: "Mr.Duke",
            floorArea:"100m^2",
            contactNo:"88016998"
        },
        {
            image: require("../../res/centris.jpg"),
            comName: "The Centris Condominium",
            address: "65 Jurong West Central 3 ",
            price: "450k SGD",
            priceRange:"Below 500k SGD",
            facilities:["Restaurant","Church"],
            location: "East SG",
            name: "Ms.Anna",
            floorArea:"150m^2",
            contactNo:"88016999"
        },]);
    const handleSearchChange = (search)=>{
        setSearch(search)
    }
    const handleSubmit = () =>{
        
        setButtonCLicked(true)
        setSearchSubmit(search)
        console.log(searchSubmit)
        var filter1 =  list.filter(listItem => listItem.comName.toLowerCase().includes(searchSubmit.toLowerCase()));
        if(!route.params){
            setResult(filter1);
            return;
        }
        const filter = route.params.filter;
        var priceRange=[];
        var facilities=[];
        var location=[];
        for(var i=0;i<filter.length;i++){
            switch(filter[i].substr(filter[i].length-1)){
                case "D": priceRange.push(filter[i]);break;
                case "G": location.push(filter[i]);break;
                default: facilities.push(filter[i]);
            }
        }
        console.log(location,facilities,priceRange)
        var filter2 = filter1.filter(item=> (priceRange.includes(item.priceRange) || location.includes(item.location) || facilities.includes(item.facilities) ))
        setResult(filter2);
    };
        useEffect(()=>{
            axios.get("http://10.0.2.2:8080/api/house/getHouse/all")
            .then(res=>{
                let newList = [...list]
                res.data.map(r=>{
                    newList.push({
                        image: require("../../res/clementi-community-centre.jpg"),
                        comName:r.communityName,
                        address:r.address,
                        price: `${r.expectedPrice}k SGD`,
                        priceRange: "500k-1000k SGD",
                        facilities:["School","Car Park"],
                        location: r.location,
                        name:r.name,
                        floorArea:`${r.floorArea}m^2`,
                        contactNo:r.contactNo
                    })
                })
                setList(newList)
            }).catch(e=>{console.log(e)})
            
        },[])
        return (
            <View style={styles.container}>
                <View style={styles.searchtop}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
                        <Image source={require("../../res/angle-left.png")} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                    
                    <View style={styles.searchBox}>
                    <TouchableOpacity onPress={()=>handleSubmit()}>
                        <Image source={require("../../res/icon_search.png")} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                        <TextInput
                            placeholder="Search for community..."
                            onChangeText={(search) => handleSearchChange(search)}
                            style={styles.txtInput}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <TouchableOpacity onPress={()=>navigation.navigate("Filter")}>
                        <Image source={iconFilter} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                 {buttonClicked?result && result.map((listItem) => (
                      <House image={listItem.image} comName={listItem.comName} address={listItem.address} price={listItem.price} name={listItem.name} floorArea={listItem.floorArea} contactNo={listItem.contactNo} />
                 )):list.map((listItem) => (
                    <House  image={listItem.image} comName={listItem.comName} address={listItem.address} price={listItem.price} name={listItem.name} floorArea={listItem.floorArea} contactNo={listItem.contactNo} />
               ))}
                </ScrollView>
            </View>
        )
    }
const styles = StyleSheet.create({
    container: {
        height:"100%",
        //paddingLeft: 10,
        //paddingRight: 10,
        paddingBottom: 10,

        
    },
    searchBox: {
        width:250,
        flexDirection: "row",
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        alignItems: "center",
        paddingLeft:5
    },
    searchtop: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 10
    },
    txtInput: {
        width: "85%",
        height: 40,

    }
});