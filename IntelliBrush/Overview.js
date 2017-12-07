import React, { Component } from 'react';
import Label from './components/Label';
import Container from './components/Container';
import Button from './components/Button';
import moment from 'moment';

import {
  ListView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
    }
  }

  render() {
  	const { navigate } = this.props.navigation;
  	console.log("username");
  	console.log(this.state.i);
  	console.log('meow');
  	//console.log(this.props.navigation.state.params.info.session);
  	console.log(this.props.navigation.state.params.info[0].grade);
    return (
    	    <ScrollView style={styles.scroll}>
    	        <Label text= {"Hi, " + this.props.navigation.state.params.name} style={styles.labelextend}/>
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

				    {this.props.navigation.state.params.info.map((prop, key) => {
				         console.warn(prop.grade);
				         var time = moment(prop.timestamp);
				         console.warn("arf");
				         console.log("killme" + time);
				         var linko = "http://hi.liujiaxin.info/index.html?data=user/0/session/" + this.state.i + "/position";
				         console.log(linko);
				         this.state.i++;
				         //var http://hi.liujiaxin.info/index.html?data=user/<user id (just 0?)>/session/<session id>/position
				         return (
				            <TouchableOpacity onPress={() => navigate('Details', {link: linko})}>
							    <View style={{flex: 2, flexDirection: 'row'}}>
							    	<View style={{width: 100, height: 40, backgroundColor: 'azure'}} >
							        	<Text style={ styles.tableBlackText }>
							        		{moment(prop.timestamp).format("YYYY-MM-DD HH:mm")}
							        	</Text>
							        </View>
							        <View style={{width: 100, height: 40, backgroundColor: 'azure'}} >
							        	<Text style={ styles.tableBlackText }>
							        		{prop.duration}
							        	</Text>
							        </View>
							        <View style={{width: 60, height: 40, backgroundColor: 'azure'}}>
							        	<Text style={ styles.tableBlackText }>
							        		{prop.grade}
							        	</Text>
							        </View>
							    </View>
				    		</TouchableOpacity>
				         );
				      })}
				    
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
    list: {

    },
    labelextend: {
	    marginTop: 55
    },
    tableBlackText: {
	    fontSize: 15,
	    color: '#595856'
	}
});
