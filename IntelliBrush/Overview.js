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
  ScrollView
} from 'react-native';

export default class Overview extends Component {
  render() {
  	const { navigate } = this.props.navigation;
    return (
    	    <ScrollView style={styles.scroll}>
    	        <Label text= {"Hi, Thesoupgirl!"} style={styles.labelextend}/>
	        	<Container>
	    			<View style={styles.header}>
	    				<Button label="Logout" styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}  onPress={() => navigate('Login')} />
	    			</View>
				</Container>
				<Container style={ styles.containy }>
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
				    <TouchableOpacity onPress={() => navigate('Details')}>
					    <View style={{flex: 2, flexDirection: 'row'}}>
					    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
					        	<Text style={ styles.tableBlackText }>
					        		Nov 17 2017
					        	</Text>
					        </View>
					        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
					        	<Text style={ styles.tableBlackText }>
					        		2 min 32 sec
					        	</Text>
					        </View>
					        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
					        	<Text style={ styles.tableBlackText }>
					        		A
					        	</Text>
					        </View>
					    </View>
				    </TouchableOpacity>
				    <TouchableOpacity onPress={() => navigate('Login')}>
					    <View style={{flex: 2, flexDirection: 'row'}}>
					    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
					        	<Text style={ styles.tableBlackText }>
					        		Nov 16 2017
					        	</Text>
					        </View>
					        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
					        	<Text style={ styles.tableBlackText }>
					        		1 min 19 sec
					        	</Text>
					        </View>
					        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
					        	<Text style={ styles.tableBlackText }>
					        		C-
					        	</Text>
					        </View>
					    </View>
				    </TouchableOpacity>
				    <View style={{flex: 2, flexDirection: 'row'}}>
				    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		Nov 15 2017
				        	</Text>
				        </View>
				        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		0 min 32 sec
				        	</Text>
				        </View>
				        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
				        	<Text style={ styles.tableBlackText }>
				        		F
				        	</Text>
				        </View>
				    </View>
				    <View style={{flex: 2, flexDirection: 'row'}}>
				    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		Nov 14 2017
				        	</Text>
				        </View>
				        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		1 min 02 sec
				        	</Text>
				        </View>
				        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
				        	<Text style={ styles.tableBlackText }>
				        		D+
				        	</Text>
				        </View>
				    </View>
				    <View style={{flex: 2, flexDirection: 'row'}}>
				    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		Nov 13 2017
				        	</Text>
				        </View>
				        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		2 min 02 sec
				        	</Text>
				        </View>
				        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
				        	<Text style={ styles.tableBlackText }>
				        		A
				        	</Text>
				        </View>
				    </View>
				    <View style={{flex: 2, flexDirection: 'row'}}>
				    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		Nov 12 2017
				        	</Text>
				        </View>
				        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		1 min 09 sec
				        	</Text>
				        </View>
				        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
				        	<Text style={ styles.tableBlackText }>
				        		D+
				        	</Text>
				        </View>
				    </View>
				    <View style={{flex: 2, flexDirection: 'row'}}>
				    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		Nov 11 2017
				        	</Text>
				        </View>
				        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		1 min 07 sec
				        	</Text>
				        </View>
				        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
				        	<Text style={ styles.tableBlackText }>
				        		D+
				        	</Text>
				        </View>
				    </View>
				    <View style={{flex: 2, flexDirection: 'row'}}>
				    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		Nov 10 2017
				        	</Text>
				        </View>
				        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		1 min 14 sec
				        	</Text>
				        </View>
				        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
				        	<Text style={ styles.tableBlackText }>
				        		D+
				        	</Text>
				        </View>
				    </View>
				    <View style={{flex: 2, flexDirection: 'row'}}>
				    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		Nov 09 2017
				        	</Text>
				        </View>
				        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		2 min 02 sec
				        	</Text>
				        </View>
				        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
				        	<Text style={ styles.tableBlackText }>
				        		A
				        	</Text>
				        </View>
				    </View>
				    <View style={{flex: 2, flexDirection: 'row'}}>
				    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		Nov 08 2017
				        	</Text>
				        </View>
				        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		1 min 12 sec
				        	</Text>
				        </View>
				        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
				        	<Text style={ styles.tableBlackText }>
				        		D+
				        	</Text>
				        </View>
				    </View>
				    <View style={{flex: 2, flexDirection: 'row'}}>
				    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		Nov 08 2017
				        	</Text>
				        </View>
				        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		2 min 02 sec
				        	</Text>
				        </View>
				        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
				        	<Text style={ styles.tableBlackText }>
				        		B
				        	</Text>
				        </View>
				    </View>
				    <View style={{flex: 2, flexDirection: 'row'}}>
				    	<View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		Nov 02 2017
				        	</Text>
				        </View>
				        <View style={{width: 100, height: 30, backgroundColor: 'azure'}} >
				        	<Text style={ styles.tableBlackText }>
				        		1 min 34 sec
				        	</Text>
				        </View>
				        <View style={{width: 60, height: 30, backgroundColor: 'azure'}}>
				        	<Text style={ styles.tableBlackText }>
				        		B-
				        	</Text>
				        </View>
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
		marginTop: -25,
		marginRight: 0,
		marginLeft: 160,
		padding: 10,
		width: 100,
	    backgroundColor: '#8DDBE0'
	},
	buttonWhiteText: {
	    fontSize: 15,
	    color: '#FFF',
	},
	containy: {
		padding: 50,
		paddingTop: 100,
		marginTop: 100
	},
	scroll: {
 		paddingTop: 30,
	    backgroundColor: '#FFFFFF',
	    padding: 30,
	    flexDirection: 'column'
    },
    label: {
    	marginTop: 45,
	    color: '#0d8898',
	    fontSize: 15
    },
    labelextend: {
	    marginTop: 55
    },
    tableBlackText: {
	    fontSize: 15,
	    color: '#595856'
	}
});
