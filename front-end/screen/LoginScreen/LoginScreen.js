import * as React from 'react';
import { View, Text, StyleSheet,TextInput, StatusBar,Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../components/context';
import axios from 'axios';
function LoginScreen({navigation}) {
    const [data,setData] =React.useState({
        email:'',
        password:'',
        check_textInputChange: false,
        secureTextEntry:true,
        isComplete: true,
        isValid: true,

    })
    const {logIn} = React.useContext(AuthContext);
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
    const handlePasswordChange = (val)=>{
        setData({
            ...data,
            password:val
        })
    }
    const updateSecureTextEntry =()=>{
        setData({
            ...data,
            secureTextEntry:!data.secureTextEntry
        })
    }
    const loginHandler = async(email, password) =>{

        if ( email.length == 0 || password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }
        await axios.get(`http://10.0.2.2:8080/api/user/loadbyEmail?email=${email}`)
      .then(res=>{
        if(!res.data || !(email == res.data.email  && password == res.data.password)) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
            }
        if(res.data && !res.data.enabled){
            Alert.alert("Unabled User!",'Your user has not been verified.Please verify your account via email', [
                {text: 'Okay'}
            ]);
            return;
        }
        logIn(res.data);
        }).catch(err=>{alert(err);})
    }
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#0a64f5' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style = {styles.text_header}> Welcome!</Text>
        </View>
        <Animatable.View animation = "fadeInUpBig" style = {styles.footer}>
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
            <Animatable.View animation="fadeInLeft" duration={500}>
                {!data.isComplete?
                <Text style={styles.errorMsg}> You must complete all field!</Text>
                :(data.isComplete&&!data.isValid?
                    <Text style={styles.errorMsg}> Your email or password is invalid </Text>:null)}
            </Animatable.View>
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandler(data.email,data.password)}}
                >
                <LinearGradient
                    colors={['#3340f5', '#1d2cf5']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Log In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterScreen')}
                    style={[styles.signIn, {
                        borderColor: '#3340f5',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#3340f5'
                    }]}>New User</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
        
      </View>
    );
  }
export default LoginScreen;

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
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

