import React from 'react';
import Login from './Login';
import { Container, Button, Content, Header, H1, Title, Body, Left, Icon, Right, Spinner} from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
       <Login />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
