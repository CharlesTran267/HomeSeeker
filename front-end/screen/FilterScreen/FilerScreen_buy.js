import * as React from 'react';
import {Text, View, StyleSheet, Button, Image, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import backIcon from "../../assets/back.png"
function FilterScreen_buy({navigation}) {
    
    const [selected,setSelected] = React.useState([])
    
    const allFilter = require("./filterList.json")
    const handleAdd =(filter)=>{
        console.log(filter)
        setSelected([...selected,filter])
    }
    const handleDelete =(filter)=>{
        console.log(filter)
        setSelected(selected.filter((selected)=>selected!==filter))
    }
    React.useEffect(()=>{
        console.log(selected)
    },[selected])
    return (

        <View style={styles.container}>

            <View style={styles.header}>            
                <View >
                <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
                        <Image source={backIcon} style={{ width: 50, height: 30,right:20,top:50 }} />
                    </TouchableOpacity>
                </View>
                <Text style={{color:"white", fontSize: 40, right: 20,top:35, fontWeight:"bold"}}>Filter</Text>
            </View>

            
            <Animatable.View animation = "fadeInUpBig" style = {styles.footer}>
            {Object.keys(allFilter).map(filter => 
            <View style={{display:"flex"}}>    
                <Text style={styles.subtitleFont}>{allFilter[filter].filterName}</Text>
                <View style={styles.tertiaryContainer}>
                {allFilter[filter].filterList.map((f)=>
                        !selected.includes(f)?
                        <TouchableOpacity 
                        style={{
                            padding: 5, 
                            borderColor: 'grey', 
                            borderWidth:1, 
                            borderRadius:8, margin:5}
                        }
                        onPress={()=>handleAdd(f)}
                            >
                            <Text style={{color:"black"}}>{f}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity 
                        style={{
                            padding: 5, 
                            borderWidth:1, 
                            borderRadius:8, margin:5,
                            backgroundColor:'#26a1ff'}
                        }
                        onPress={()=>handleDelete(f)}
                            >
                            <Text style={{color:"white"}}>{f}</Text></TouchableOpacity>
                    )}
                    </View>
            </View>)}
            <TouchableOpacity
                    style={styles.confirm}
                    onPress={() => navigation.navigate('Search',{filter:selected})}
                >
                <LinearGradient
                    colors={['#3340f5', '#1d2cf5']}
                    style={styles.confirm}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Confirm</Text>
                </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>             
            </View>)
        }
export default FilterScreen_buy


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#0a64f5'
      },
      footer: {
          flex: 3,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30
      },
    header:{
        display: "flex",
        flexDirection:"row",
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    filterFont:{
        color:"black",
        fontSize: 40,
    },
    subtitleFont:{
        color:"black",
        fontWeight:"bold",
        fontSize: 25,
    },
    containter:{
        flexDirection: "column",      
        padding: 20,  
    },
    secondaryContainer1:{
        height:100,
    },
    secondaryContainer2:{
        height:200,
    },
    secondaryContainer3:{
        height:200,
    },
    tertiaryContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
    },
    threeButtons:{
        backgroundColor: "gold",
        height:200,
    },
    image:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    backArrow:{
        height:50,
        width: 50,
    },
    confirm: {
        top:10,
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
}) 
