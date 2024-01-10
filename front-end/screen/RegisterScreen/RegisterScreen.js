import * as React from 'react';
import axios from 'axios';
import {ScrollView, View, Text, StyleSheet,TextInput, StatusBar,Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ease } from 'react-native/Libraries/Animated/Easing';
import validator from 'validator';
function RegisterScreen({navigation}) {
    const [data,setData] =React.useState({
        email:'',
        confirm_password:'',
        password:'',
        firstName:"",
        lastName:"",
        check_textInputChange: false,
        secureTextEntry:true,
        confirm_secureTextEntry: true,
        isComplete:true,
        isValidEmail:true,
        isValidPassword:true,
        samePassword:true
    })
    const textInputChange = (val)=>{
        if(val.length != 0 ){
            setData({
                ...data,
                email:val,
                check_textInputChange:true
            })
        }else{
            setData({
                ...data,
                email:val,
                check_textInputChange:false
            })
        }
    }
    const handleFirstNameChange = (val)=>{
        setData({
            ...data,
            firstName:val
        })
    }
    const handleLastNameChange = (val)=>{
        setData({
            ...data,
            lastName:val
        })
    }
    const handlePasswordChange = (val)=>{
        setData({
            ...data,
            password:val
        })
    }
    const handleConfirmPasswordChange = (val)=>{
        setData({
            ...data,
            confirm_password:val
        })
    }
    const updateSecureTextEntry =()=>{
        setData({
            ...data,
            secureTextEntry:!data.secureTextEntry
        })
    }
    const updateConfirmSecureTextEntry =()=>{
        setData({
            ...data,
            confirm_secureTextEntry:!data.confirm_secureTextEntry
        })
    }

    const registerhandler = (firstName, lastName, email, password,confirm_password) => {
        if(!firstName|| !lastName || !email || !password || !confirm_password){
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
        if(validator.isEmail(email)){
            setData({
                ...data,
                isValidEmail:true
            })
        }else{
            setData({
                ...data,
                isValidEmail:false
            })
            return;
        }
        if(password.length>=6){
            setData({
                ...data,
                isValidPassword:true
            })
        }
        else{
            setData({
                ...data,
                isValidPassword:false
            })
            return;
        }
        if(confirm_password == password){
            setData({
                ...data,
                samePassword:true
            })
        }else{
            setData({
                ...data,
                samePassword:false
            })
            return;
        }
        console.log(data.isComplete)
        if(data.isComplete && data.isValidEmail && data.isValidPassword && data.samePassword){
        const req = {
            "firstName":firstName,
            "lastName":lastName,
            "email":email,
            "password":password
        }
        axios.post("http://10.0.2.2:8080/api/registration",req)
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
        navigation.navigate("LoginScreen")
    }
    return (
      <ScrollView style={styles.container}>
          <StatusBar backgroundColor='#0a64f5' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style = {styles.text_header}> Join Us!</Text>
        </View>
        <Animatable.View animation = "fadeInUpBig" style = {styles.footer}>
        <Text style = {styles.text_footer}>First Name</Text>
            <View style = {styles.action}>
                <FontAwesome
                    name="user-o"
                    color = "#05375a"
                    size = {20}
                />
                <TextInput
                    placeholder = "First Name"
                    style = {styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>handleFirstNameChange(val)}
                />
            </View>
            <Text style = {styles.text_footer}>Last Name</Text>
            <View style = {styles.action}>
                <FontAwesome
                    name="user-o"
                    color = "#05375a"
                    size = {20}
                />
                <TextInput
                    placeholder = "Last Name"
                    style = {styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>handleLastNameChange(val)}
                />
            </View>
            <Text style = {styles.text_footer}>Email</Text>
            <View style = {styles.action}>
                <FontAwesome
                    name="user-o"
                    color = "#05375a"
                    size = {20}
                />
                <TextInput
                    placeholder = "Your Email"
                    style = {styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>textInputChange(val)}
                />
                {data.check_textInputChange?
                <Animatable.View>
                    <Feather
                    name="check-circle"
                    color="green"
                    size={20}
                />
                </Animatable.View>
                :null}
            </View>
            { data.isValidEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Your email is invalid.</Text>
            </Animatable.View>
            }
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style = {styles.action}>
            <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder = "Your Password"
                    secureTextEntry={data.secureTextEntry? true:false}
                    style = {styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>handlePasswordChange(val)}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                    {data.secureTextEntry?
                    <Feather
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must have at least 6 characters.</Text>
            </Animatable.View>
            }
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style = {styles.action}>
            <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder = "Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry? true:false}
                    style = {styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                    {data.confirm_secureTextEntry?
                    <Feather
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.samePassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Confirmation Password does not match.</Text>
            </Animatable.View>
            }
            { data.isComplete ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Please complete all the field.</Text>
            </Animatable.View>
            }
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {registerhandler( data.firstName,data.lastName,data.email,data.password,data.confirm_password )}}
                >
                <LinearGradient
                    colors={['#3340f5', '#1d2cf5']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Send Confirmation Email</Text>
                </LinearGradient>
                </TouchableOpacity>

            </View>
        </Animatable.View>
        
      </ScrollView>
    );
  }
export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#0a64f5'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        textAlign:'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

