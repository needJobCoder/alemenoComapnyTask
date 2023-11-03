import React, {useContext} from 'react';
import {TextInput, View, StyleSheet, Touchable, TouchableOpacity, Text} from 'react-native';

import {GlobalContext} from '../App';

function Login() {
  const {email, setEmail, username, setUsername} = useContext(GlobalContext);
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" onChangeText={(text)=>{setUsername(text)}} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={(text)=>{setEmail(text)}} />
      <TouchableOpacity style={{
          backgroundColor: '#04AA6D',
          color: 'white',
          padding: 10,
          borderRadius: 4,
          width:'40%',
          textAlign:'center',
          alignItems:'center'
        }}>
        <Text style={{color:'white'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color of the container
  },
  input: {
    width: 300, // Width of the TextInput
    height: 40, // Height of the TextInput
    borderColor: 'gray', // Border color
    borderWidth: 1, // Border width
    borderRadius: 5, // Border radius
    marginBottom: 10, // Spacing between TextInputs
    paddingHorizontal: 10, // Horizontal padding inside the TextInput
  },
});

export default Login;
