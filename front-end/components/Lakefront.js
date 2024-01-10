import { useNavigation } from '@react-navigation/core'
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Lakefront () {
    const navigation = useNavigation();
        return (

                <View style={styles.item}>
                    <View style={styles.picBox}>
                        <TouchableOpacity
                            onPress={()=>navigation.navigate("Community",
                            {
                                image: require("../res/lakefront.jpg"),
                                comName: "Lakefront Residences",
                                address: "48 Lakeside Drive ",
                                price: "750k SGD",
                                name: "Mr.Charles",
                                floorArea:"130m^2",
                                contactNo:"88016997"
                            })}
                        >
                        <Image source={require("../assets/lakefront.jpg")} style={styles.pic} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.txt1}>Lakefront Residences</Text>
                    <Text style={styles.txt2}>48 Lakeside Drive </Text>
                    <Text style={styles.txt3}>750k SGD</Text>
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
        marginLeft: 30

    },
    txt2: {
        fontSize: 12,
        marginTop: 5,
        marginLeft: 30,

    },
    txt3: {
        color: "#f00",
        fontWeight: "bold",
        fontSize: 12,
        marginTop: 5,
        marginLeft: 30,


    },
    picBox: {
        alignItems: "center"
    }
})