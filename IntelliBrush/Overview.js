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
				<Label text="Latest Sessions" />
				<View style={{flex: 1, flexDirection: 'row'}}>
			        <View style={{width: 100, height: 30, backgroundColor: 'lightgrey'}} >
			        	<Text style={ styles.tableBlackText }>
			        		Time Stamp
			        	</Text>
			        </View>
			        <View style={{width: 100, height: 30, backgroundColor: 'lightgrey'}} >
			        	<Text style={ styles.tableBlackText }>
			        		Duration
			        	</Text>
			        </View>
			        <View style={{width: 60, height: 30, backgroundColor: 'lightgrey'}}>
			        	<Text style={ styles.tableBlackText }>
			        		Grade
			        	</Text>
			        </View>
			    </View>
			</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	header: {
	   marginTop: -10
	},
	primaryButton: {
		marginRight: 0,
		marginLeft: 90,
		paddingLeft: 50,
		paddingRight: 50,
	    backgroundColor: '#8DDBE0'
	},
	buttonWhiteText: {
	    fontSize: 15,
	    color: '#FFF',
	},
	scroll: {
 		paddingTop: 30,
	    backgroundColor: '#FFFFFF',
	    padding: 30,
	    flexDirection: 'column'
    },
    label: {
	    color: '#0d8898',
	    fontSize: 15
    },
    tableBlackText: {
	    fontSize: 15,
	    color: '#595856'
	}
});
