import React, { Component } from 'react'
import { View, Image, StyleSheet, Button } from 'react-native'
import Recom from '../../components/Recom'
import Popular from '../../components/Popular'
import searchBar from "../../res/search_bar.jpg"
import iconHome from "../../assets/icon_home.png"
import globalStyle from '../../assets/globalStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'

function HomeScreen({navigation}) {

        return (
            <View>
                {/* <Hometop /> */}
                <View style={styles.hometop}>
                <View style={styles.searchBox}>
                <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
                        <Image source={searchBar} style={{ width: 300, height: 30 }} />
                    </TouchableOpacity>
                </View>
                </View>
                <Recom />
                <Popular />
            </View>
        )
    }
export default HomeScreen;

const styles = StyleSheet.create({
    hometop: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 10

    },
})