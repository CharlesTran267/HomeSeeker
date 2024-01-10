import { useNavigation } from '@react-navigation/core'
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Lakeville () {
    const navigation = useNavigation();
        return (
            

                <View style={styles.item}>
                    <View style={styles.picBox}>
                        <TouchableOpacity
                            onPress={()=>navigation.navigate("Community",{
                                image: require("../res/lakeville.jpg"),
                                comName: "Lakeville",
                                address: "1 Jurong Lake Link",
                                price: "820k SGD",
                                name: "Ms.Lim",
                                floorArea:"110m^2",
                                contactNo:"88016996"
                            })}
                        >
                            <Image source={require("../assets/lakeville.jpg")} style={styles.pic} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.txt1}>Lakeville Condo</Text>
                    <Text style={styles.txt2}>1 Jurong Lake Link </Text>
                    <Text style={styles.txt3}>820k SGD</Text>
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