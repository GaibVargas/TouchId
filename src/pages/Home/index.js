import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Routes from '../../routes';

export default function Home() {
  const [showDeleteFingerPrintButton, setShowDeleteFingerPrintButton] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if(route.params.user.touchId) {
      setShowDeleteFingerPrintButton(true);
    }
  }, []);

  async function handleDeleteFingerPrint() {
    await AsyncStorage.clear();
    setShowDeleteFingerPrintButton(false);
    return alert('Finger print deleted');
  }

  function handleLogout() {
    navigation.popToTop();
  }

  return(
    <View style={styles.container}>
      <Text style={styles.name}>{route.params.user.name}</Text>
      <Text style={styles.email}>{route.params.user.email}</Text>

      <TouchableOpacity 
          onPress={handleLogout}
          style={styles.button}
        >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      { route.params.user.touchId && showDeleteFingerPrintButton && (
        <TouchableOpacity 
          onPress={handleDeleteFingerPrint}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Delete finger print login</Text>
        </TouchableOpacity>
      ) }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  email: {
    fontSize: 18,
    color: '#808080',
    marginBottom: 50,
  },

  button: {
    height: 50,
    paddingHorizontal: 20,
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
});
