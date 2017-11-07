import React from 'react';
import Login from './Login';
import Overview from './Overview';
import { StackNavigator } from 'react-navigation';
import { Container, Button, Content, Header, H1, Title, Body, Left, Icon, Right, Spinner} from 'native-base';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
       <Nav />
    );
  }
}
navigationOptions = { title: 'Welcome', header: null };
export const Nav = StackNavigator({
  Login: { screen: Login, navigationOptions: { header: null }},
  Overview: { screen: Overview, navigationOptions: { header: null }  }},
  navigationOptions: { header:{ visible:false }},
  { headerMode: 'none' },
);

AppRegistry.registerComponent('App', () => Nav);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
