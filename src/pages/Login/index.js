import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import Icon from 'react-native-vector-icons/Ionicons';

import users from '../../utils/users';

export default function Login() {
  const [email, setEmail] = useState('');
  const [haveTouchId, setHaveTouchId] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function verifyHardwareToOtherWayToLogin() {
      const haveHardware = await LocalAuthentication.hasHardwareAsync();

      if(!haveHardware) return false;

      const arrayOfMethodsToLogin = await LocalAuthentication.supportedAuthenticationTypesAsync();
      const supportFingerPrint = arrayOfMethodsToLogin.find(type => type === 1); //if it returns 1, it means that smartphone support fingerPrint proccess

      if(supportFingerPrint !== 1) return false;

      if(!await LocalAuthentication.isEnrolledAsync()) return false;

      const localStorageEmail = await AsyncStorage.getItem('@TouchId:email');

      if(localStorageEmail === null) return false;

      return true;
    }

    const showTouchId = verifyHardwareToOtherWayToLogin();
    setHaveTouchId(showTouchId);
  }, []);

  async function handleTouchId() {
    const verifyFingerPrint = await LocalAuthentication.authenticateAsync();

    if(!verifyFingerPrint) return alert('Finger print not recognized');

    const localStorageEmail = await AsyncStorage.getItem('@TouchId:email');

    const response = users.filter(user => user.email === localStorageEmail);

    if(response.length) return navigation.navigate('Home', {
      user: {
        name: response[0].name,
        email: response[0].email,
        touchId: true,
      }
    });

    return alert('Login once first with your email');
  }

  async function handleLogin() {
    if(!email) return;

    const response = users.filter(user => user.email === email);

    const localStorageEmail = await AsyncStorage.getItem('@TouchId:email');

    if(localStorageEmail === null) {
      await AsyncStorage.setItem('@TouchId:email', email);
    }

    if(response.length) return navigation.navigate('Home', {
      user: {
        name: response[0].name,
        email: response[0].email,
        touchId: false,
      }
    });
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <View style={styles.inputBox}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input}
          placeholder="Input your email"
          keybordType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity 
          onPress={handleLogin}
          style={styles.button}  
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>

        {haveTouchId && (
          <>
            <View style={styles.lineBox}>
              <View style={styles.line} />
              <Text style={styles.lineText}>or</Text>
            </View>

            <TouchableOpacity
              style={styles.fingerPrintButton}
              onPress={handleTouchId}
            >
              <Icon name="md-finger-print" size={70} color="#bbb" />
            </TouchableOpacity>
          </>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 100,
  },

  inputBox: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30, 
  },

  label: {
    fontSize: 20,
    color: '#555555',
    alignSelf: 'flex-start',
    marginLeft: 2,
    marginBottom: 5,
  },

  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1, 
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 20,
    marginBottom: 15,
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#505050',
    borderRadius: 4,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    color: '#eee',
  },

  lineBox: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },

  line: {
    borderColor: '#ccc',
    borderWidth: .5,
    width: '100%',
    height: 0,
    marginVertical: 'auto'
  },

  lineText: {
    position: 'absolute',
    backgroundColor: '#fafafa',
    paddingHorizontal: 10,
    color: '#ccc'
  },

  fingerPrintButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
