import React, { useState } from "react";
import ListItemDivider from "./ListItemDivider";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import {launchImageLibrary} from 'react-native-image-picker';
import backIcon from "../../assets/back.png"
import { TouchableOpacity } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");

// 个人信息页面
function AccountProfileChange({navigation,route}) {
  const data= route.params;
  const [picNo,setPicNo] =useState(1);
  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      setPicNo(2);
    });
  };
        return (
        <View style={styles.container}>
            <TouchableOpacity style ={{top:15}} onPress={()=>navigation.navigate("Profile2")}>
                <Image source={require("../../res/angle-left.png")} style={{ left:10,width: 30, height: 30 }} />
            </TouchableOpacity>
        <View style={styles.list}>
            <TouchableHighlight
              underlayColor={'lightgrey'}
              onPress={() => {
              handleChoosePhoto();}}>
            
             <View style={styles.listItem}>
                <Text style={styles.listItemLeftText}>Photo</Text>
                <View style={styles.rightContainer}>
                    <View style={[styles.listItemRight]}>
                      {picNo==1?
                        <Image
                          style = {styles.avatarImg}
                          source={require('../../assets/defaultProfile.png')}
                        />:
                        <Image
                          style = {styles.avatarImg}
                          source={require("../../assets/jiang.jpg")}
                        />}
                    </View>
                </View>
              </View>
            </TouchableHighlight>
          <ListItemDivider />
          <TouchableHighlight
            underlayColor={'lightgrey'}>
            <View style={styles.listItem} activeOpacity={0.6}>
              <Text style={styles.listItemLeftText}>Name</Text>
              <View style={styles.rightContainer}>
                <Text>{data.firstName} {data.lastName} </Text>
              </View>
              
            </View>
          </TouchableHighlight>
          <ListItemDivider /> 
        </View>
        <View
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            left: 0,
            top: 0,
            width: width
          }}
        >
          
        </View>
      </View>
    );
}

export default AccountProfileChange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'white'
  },
  return: {
    flex: 0.1,
    flexDirection: "column",
    marginTop: 0,
    backgroundColor: "#FFFFF"
  },
  list: {
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
    backgroundColor: "#FFFFF"
  },
  listItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#FFFF0"
  },
  listItemLeftText: {
    alignItems: "flex-start",
    color: "#000000",
    fontSize: 20
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  listItemRight: {
    alignItems: "flex-end"
  },
  avatarImg: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
});



  