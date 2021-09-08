/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Pressable,
  FlatList,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {borderRadius} from 'styled-system';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.highlight,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>

      <View style={{width: 160}}>{children}</View>
    </View>
  );
};

const App = () => {
  const [apiurl, setApiUrl] = useState('http://192.168.1.106:8080/tshirt/1');
  const [keys, setKeys] = useState('red');
  const [value, setValue] = useState('13');
  const [data, setData] = useState('NULL');
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const hitAPI = async () => {
      try {
        await axios
          .post(apiurl, {
            reqKey: keys,
            reqVal: value,
          })
          .then(response => response.data)
          .then(json => {
           // console.log(json);
            setData(json);
          })
          .catch(function (error) {
            setData(String(error));
            console.log('axios error => ', error);
          });
        //
      } catch (err) {
        setData(String(err));
      }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 10,
          }}>
          <Section title=" Provide an API endpoint"></Section>
          <TextInput
            style={styles.apiContainer}
            onChangeText={setApiUrl}
            value={apiurl}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: 0,
              padding: 0,
            }}>
            <Section title="Key">
              <TextInput
                style={styles.input}
                onChangeText={setKeys}
                value={keys}
              />
            </Section>
            <Section title="Value">
              <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
              />
            </Section>
          </View>
          <Pressable style={styles.button} onPress={hitAPI}>
            <Text style={styles.text}>Fetch</Text>
          </Pressable>
          <View
            style={{
              margin: 14,
              backgroundColor: '#262626',
              height: 300,
              justifyContent: 'flex-start',
            }}>
            <SafeAreaView style={{flex: 1}}>
             
              {typeof data == 'string' ? (
                <Text style={{color: '#ffffff'}}>{data}</Text>
              ) : (
                data.map((item, index) => (
                  <Text key={index} style={{color: '#ffffff'}}>
                    {item.key} : {item.val}
                  </Text>
                ))
              )}
            </SafeAreaView>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#841584',
    marginTop: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  input: {
    backgroundColor: '#ffffff',
    height: 40,
    borderWidth: 3,
    padding: 10,
    color: '#000000',
    fontSize: 18,
    borderRadius: 5,
    borderColor: '#808080',
    fontWeight: '600',
  },
  apiContainer: {
    borderRadius: 5,
    borderColor: '#808080',
    fontWeight: '600',
    backgroundColor: '#ffffff',
    height: 40,
    marginHorizontal: 10,
    borderWidth: 1,
    padding: 10,
    color: '#000000',
    fontSize: 18,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    margin: 6,
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#000000',
  },
});

export default App;
