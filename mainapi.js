/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import axios from 'axios';
import React, { useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
const Section = ({children, title}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={ styles.highlight }> {title}</Text>
      <View style={{width: 160}}>{children}</View>
    </View>
  );
};
const App = () => {
  const [apiurl, setApiUrl] = useState('http://192.168.1.106:8080/tshirt/1');
  const [keys, setKeys] = useState('red');
  const [value, setValue] = useState('13');
  const [data, setData] = useState('NULL');
  const hitAPI = async () => {
      try {
        await axios.post(apiurl, { reqKey: keys, reqVal: value })
          .then(response => response.data)
          .then(json => {
           // console.log(json);
            setData(json);
          })
          .catch(function (error) {
            setData(String(error));
            console.log('axios error => ', error);
          });
      } catch (err) {
        setData(String(err));
      }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView >
        <View
          style={{
            backgroundColor: "#000000",
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
              padding:20
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
