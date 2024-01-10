import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native'

const { width } = Dimensions.get("window")

export default class Popular extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sign: 1
        }

        this.handleMomentumScrollEnd = this.handleMomentumScrollEnd.bind(this)
    }

    handleMomentumScrollEnd(e) {

        let offsetX = e.nativeEvent.contentOffset.x

        this.setState({
            sign: offsetX == 360 ? 0 : 1
        })
    }

    render() {
        return (
            <View>
                <Text style={styles.txt}>Popular nearby</Text>
                <View style={styles.pop}>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={this.handleMomentumScrollEnd}
                    >
                        <View style={styles.box1}>
                            <Image source={require("../assets/house3.jpg")} style={styles.pic} />
                            <Image source={require("../assets/house4.jpg")} style={styles.pic} />
                        </View>
                        <View style={styles.box2}>
                            <Image source={require("../assets/house1.jpg")} style={styles.pic} />
                            <Image source={require("../assets/house2.jpg")} style={styles.pic} />
                        </View>
                    </ScrollView>
                    <View style={styles.pointsBox}>
                        <View style={this.state.sign == 1 ? styles.currentPoint : styles.point}></View>
                        <View style={this.state.sign == 0 ? styles.currentPoint : styles.point}></View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pop: {
        //height: 200
        marginTop: 5,
    },
    box1: {
        width,
        height: 180,
        //backgroundColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    box2: {
        width,
        height: 180,
        //backgroundColor: "#fcf",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    pointsBox: {
        height: 10,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 2.5


    },
    point: {
        width: 5,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 5,
        marginLeft: 1.5,
        marginRight: 1.5,

    },
    currentPoint: {
        width: 5,
        height: 5,
        backgroundColor: "#f40",
        borderRadius: 5,
        marginLeft: 1.5,
        marginRight: 1.5,

    },
    txt: {
        marginTop: 10,
        marginLeft: 15,
        fontSize: 15,
        color: "#000"

    },
    pic: {
        width: 120,
        height: 160,
        borderRadius: 10

    }
})