import React from 'react';
import Login from './Login';
import Overview from './Overview';
import { Font } from 'expo';
import { StackNavigator } from 'react-navigation';
import { Container, Button, Content, Header, H1, Title, Body, Left, Icon, Right, Spinner} from 'native-base';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props: Object): void {
       super(props);
       this.state = {
         isLoading: false,
       };
   }

  async componentDidMount() {
    await Font.loadAsync({
      "Barlow-Regular": require('./assets/fonts/Barlow-Regular.ttf')
    })
    this.setState({ fontLoaded: true })
  }
  render() {
    if (!this.state.fontLoaded) {
      return (<View><Text>Loading...</Text></View>);
    }
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
