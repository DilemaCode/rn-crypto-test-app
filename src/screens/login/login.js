import React from 'react';
import { SafeAreaView, ActivityIndicator,View, TextInput, Image, Text, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './login.style.js';

const LoginScreen = ({ navigation }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [canContinue, setCanContinue] = React.useState(false);

  const getUser = async () => {
    try {
      const _usrn = await AsyncStorage.getItem('username')
      if (_usrn == '' || _usrn == null) throw 'No user logged';
      setUsername(_usrn);
      navigation.navigate('CryptoList');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      {isLoading && <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} size="large" />}
      {!isLoading && <View style={styles.top} >
        <View></View>
        <View style={{ width: '100%' }}>
          <Text style={styles.logoTitle}>CryptoApp</Text>
          <Image
            style={styles.logoImage}
            resizeMode='contain'
            source={require('../../assets/img/logo.png')}
          />
        </View>
        <View style={{ width: '100%' }}>
          {/* <Text>Username</Text> */}

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(v) => {
              setCanContinue(v != '');
              setUsername(v);
            }}
          ></TextInput>
          <TouchableHighlight
            style={{ backgroundColor: canContinue ? '#000' : '#777', ...styles.button }}
            underlayColor={null}
            onPress={!canContinue ? null : async () => {
              await AsyncStorage.setItem(
                'username',
                username
              );

              navigation.replace('CryptoList');
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>}
    </SafeAreaView >
  );
}
export default LoginScreen;