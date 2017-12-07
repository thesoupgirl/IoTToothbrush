import React, { Component } from 'react';
import Label from './components/Label';
import Container from './components/Container';
import Button from './components/Button';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  WebView
} from 'react-native';

export default class Details extends Component {
  render() {
  	console.log('meow');
  	return(
  		<View style={styles.container}>
    		<WebView url={this.props.navigation.state.params.link} style= {styles.webstuff}/>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  webstuff: {
    marginTop: 50,
    maxHeight: 500,
    width: 320,
    flex: 1
  }
});