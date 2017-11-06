import React, { Component } from 'react';
import Label from './components/Label';
import Container from './components/Container';
import Button from './components/Button';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';

export default class Overview extends Component {
  render() {
  	const { navigate } = this.props.navigation;
    return (
    	    <ScrollView style={styles.scroll}>
	        	<Container>
	    			<View style={styles.header}>
	    				<Button label="Logout" styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}  onPress={() => navigate('Login')} />
	    			</View>
				</Container>
			</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	header: {
	   marginTop: -10
	},
	primaryButton: {
		paddingRight: 50,
	    backgroundColor: '#8DDBE0'
	},
	buttonWhiteText: {
	    fontSize: 20,
	    color: '#FFF',
	},
	scroll: {
 		paddingTop: 30,
	    backgroundColor: '#FFFFFF',
	    padding: 30,
	    flexDirection: 'column'
    },
});
