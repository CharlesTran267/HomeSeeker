import React, { useState } from "react";
import ListItemDivider from "./ListItemDivider";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ScrollView,
  Button
} from "react-native";
import { StackNavigator, TabNavigator } from 'react-navigation';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from "axios"
import { useNavigation } from "@react-navigation/core";
const { width } = Dimensions.get("window");


export default function PostSellInfo() {
  const navigation = useNavigation();
  const [photo,setPhoto] = useState(null)
    const [data,setData] = useState({
      location:"",
      comName:"",
      address:"",
      price:0,
      floorArea:0,
      name:"",
      contactNo:0,
      isComplete:true
    })
    const handleChangeLoc = (val) =>{
      setData({
        ...data,
        location:val
      })
    }
    const handleChangeComName = (val) =>{
      setData({
        ...data,
        comName:val
      })
    }
    const handleChangeAdd = (val) =>{
      setData({
        ...data,
        address:val
      })
    }
    const handleChangePrice = (val) =>{
      setData({
        ...data,
        price:val
      })
    }
    const handleChangeFloor = (val) =>{
      setData({
        ...data,
        floorArea:val
      })
    }
    const handleChangeName = (val) =>{
      setData({
        ...data,
        name:val
      })
    }
    const handleChangeContact = (val) =>{
      setData({
        ...data,
        contactNo:val
      })
    }
    const handleChoosePhoto = () => {
      const options = {
        noData: true,
      };
      launchImageLibrary(options, (response) => {
        if (response.uri) {
          setPhoto(response);
          navigation.navigate("Search");
        }
      });
    };
    const handleSubmit = (data)=>{
      if(!data.location || !data.comName || !data.address || data.price==0|| data.floorArea==0 || !data.name|| data.contactNo==0){
        setData({
          ...data,
          isComplete:false
        })
        Alert.alert('Wrong Input!', 'You have to complete all fields.', [
            {text: 'Okay'}
        ]);
        return;
      }else{
        setData({
            ...data,
            isComplete:true
        })
      }
      if(data.isComplete){
        const req = {
          "location":data.location,
          "communityName":data.comName,
            "address":data.address,
            "expectedPrice":data.price,
            "floorArea":data.floorArea,
            "name":data.name,
            "contactNo":data.contactNo,
            "imageURL":"../../res/clementi-community-centre.jpg"
          }
          axios.post("http://10.0.2.2:8080/api/house",req)
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
                }
            });
      }
      alert('Information Posted successfully!');
      navigation.navigate('AccountInfo');
    }
    return (
         
      <View style={styles.container}>
          
         
         <ScrollView style={styles.scrollView}>
          <View style={styles.list}>
            <View style={styles.listItem} activeOpacity={0.6}>
              <Text style={styles.listItemLeftText}>*Location</Text>
              <View style={styles.rightContainer}>
                    <TextInput
                    style = {styles.input}
                    placeholder="Please enter"
                    onChangeText={(val)=>handleChangeLoc(val)}
                     />
                </View>
            </View>
         

            <View style={styles.listItem} activeOpacity={0.6}>
              <Text style={styles.listItemLeftText}>*Community Name</Text>
                  <View style={styles.rightContainer}>
                    <TextInput
                      placeholder="Please enter"
                      onChangeText={(val)=>handleChangeComName(val)}
                      //keyboardType="numeric"
                    />
                  </View>
              
            </View>

              
            <View style={styles.listItem} activeOpacity={0.6}>
              <Text style={styles.listItemLeftText}>*Address</Text>
              <View style={styles.rightContainer}>
                <TextInput
                  placeholder="Please enter"
                  onChangeText={(val)=>handleChangeAdd(val)}
                  //keyboardType="numeric"
                />
              </View>
              
            </View>
              

            <View style={styles.listItem} activeOpacity={0.6}>
              <Text style={styles.listItemLeftText}> Expected Price</Text>
              <View style={styles.rightContainer}>
                <TextInput
                placeholder="Please enter"
                keyboardType="numeric"
                onChangeText={(val)=>handleChangePrice(val)}
                />
              </View>
              
            </View>

   
            <View style={styles.listItem} activeOpacity={0.6}>
              <Text style={styles.listItemLeftText}>*Floor Area (sq m)</Text>
              <View style={styles.rightContainer}>
                <TextInput
                  placeholder="Please enter"
                  keyboardType="numeric"
                  onChangeText={(val)=>handleChangeFloor(val)}
                />
              </View>
              
            </View>
          
 
          <View style={styles.listItem} activeOpacity={0.6}>
              <Text style={styles.listItemLeftText}> Name </Text>
              <View style={styles.rightContainer}>
                <TextInput
                  placeholder="Please enter"
                  onChangeText={(val)=>handleChangeName(val)}
                />
              </View>
              
          </View>
     
            <View style={styles.listItem} activeOpacity={0.6}>
            
              <Text style={styles.listItemLeftText}>*Contact no.</Text>
              <View style={styles.rightContainer}>
                 
                <TextInput
                placeholder="Please enter"
                keyboardType="numeric"
                onChangeText={(val)=>handleChangeContact(val)}
                />
                
              </View>
              
            </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', bottom:10 }}>
          {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={()=>handleChoosePhoto()} />
      </View>
       
          <TouchableHighlight
            underlayColor={'blue'}
            onPress={() => {
              handleSubmit(data)
            }}>
            <View style={styles.listItemLast} activeOpacity={0.6}>
              
              
                <Text style={styles.midContainer}>Submit</Text>
              
              
            </View>
          </TouchableHighlight>
       

          
        </View>

          
        </ScrollView>
        
      </View>

      
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'white',
  },
  return: {
    //flex: 1,
    flexDirection: "column",
    marginTop: 0,
    backgroundColor: "black"
  },
  list: {
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
    backgroundColor: "white"
  },
  listItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: "white"
  },
  listItemLast: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#00db00"
  },
  listItemLeftText: {
    alignItems: "flex-start",
    color: "#000000",
    fontSize: 20
  },
  midContainer: {
    color: "white",
    fontSize: 20,
    paddingLeft: 160,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  listItemRight: {
    alignItems: "flex-end"
  },
  input: {
    fontSize: 15,
    color: 'black'
  },
  
  
});


