import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/core'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function House({image,comName,address,price,name,floorArea,contactNo}) {
    const navigation = useNavigation();
        return (


            <View style={styles.item}>
                <View style={styles.picBox}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Community",{image:image,comName:comName,address:address,price:price,name:name,floorArea:floorArea,contactNo:contactNo})}>
                        <Image source={eval(image)} style={styles.pic} />
                        {console.log(image)}
                        
                    </TouchableOpacity>
                </View>

                <Text style={styles.txt1}>{ comName }</Text>
                <Text style={styles.txt2}>{ address }</Text>
                <Text style={styles.txt3}>{ price }</Text>
            </View>


        )
    }

const styles = StyleSheet.create({
    item: {
        marginTop: 5,
        marginBottom: 5
    },
    pic: {
        width: 280,
        height: 160,
        marginTop: 10,
        borderRadius: 5,

    },
    txt1: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
        marginTop: 5,
        marginLeft: 40

    },
    txt2: {
        fontSize: 12,
        marginTop: 5,
        marginLeft: 40,

    },
    txt3: {
        color: "#f00",
        fontWeight: "bold",
        fontSize: 12,
        marginTop: 5,
        marginLeft: 40,


    },
    picBox: {
        alignItems: "center"
    }
})