import React,{Component} from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, TouchableHighlight  } from 'react-native';

export default class ChangeUserName extends Component {


render(){
  return (
    <KeyboardAvoidingView
      //behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
         
          <Text style={styles.header}></Text>
          
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Confirm" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 20,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 28,
    marginTop: -60
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
});
