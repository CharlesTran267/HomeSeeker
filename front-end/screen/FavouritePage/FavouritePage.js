import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import Caspian from "../../components/Caspian"
import Lakefront from "../../components/Lakefront"
import Lakeville from "../../components/Lakeville"


import globalStyle from "../../assets/globalStyle"

export default class FavoritePage extends Component {
    static navigationOptions = {
        tabBarLabel: 'Favorite',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require("../../res/icon_favorite.png")}
                style={[globalStyle.iconStyle, { tintColor: tintColor }]}
            />
        ),
    };

    render() {
        return (
            <View style={styles.favoBox}>
                <ScrollView>
                    <Caspian />
                    <Lakefront />
                    <Lakeville />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    favoBox: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        marginBottom: 10,

    },
    
})