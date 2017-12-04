import React, { Component } from 'react';
import Container from './components/Container';
import Button from './components/Button';
import Label from './components/Label';
import Overview from './Overview';
import { StackNavigator } from 'react-navigation';
var md5 = require('md5');

import {
  Alert,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      username: 'Thesoupgirl',
      password: '',
    }
  }

  clearText = () => {
    this._textInput.setNativeProps({text: ''});
    this._textInput2.setNativeProps({text: ''});
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
  	const { navigate } = this.props.navigation;
    return (
        <ScrollView style={styles.scroll}>
        <View>
    		<Image style={styles.stretch, styles.imagePlace} source={require('./16ec5560-c56e-48ee-831b-2e8fe4080a75.png')} />
    	</View>
        	<Container>
    			<Label text="Username or Email" />
    			<TextInput underlineColorAndroid='transparent' ref={component => this._textInput = component} style={styles.textInput} onChangeText={(text) => this.setState({username:text})}/>
			</Container>
			<Container>
    			<Label text="Password" />
    			<TextInput underlineColorAndroid='transparent' ref={component => this._textInput2 = component} secureTextEntry={true} style={styles.textInput} onChangeText={(text) => this.setState({password:text})}/>
			</Container>
			<Container>
				<Button styles={{button: styles.transparentButton}} onPress={this.press.bind(this)}>
				</Button>
    		</Container>
    		<View style={styles.footer}>
	    		<Container>
	        		<Button label="Sign In" styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}  onPress={this.pressSignIn.bind(this)} />
	    		</Container>
    			<Container>
			        <Button label="CANCEL" styles={{label: styles.buttonBlackText}} onPress={this.clearText} />
		    	</Container>
			</View>
        </ScrollView>
    );
  }

pressSignIn() {
	console.log("killme");
	const { navigate } = this.props.navigation;
	console.log(this.state.username);
	if(this.state.username != '' && this.state.password != '') {
		navigate('Overview');
	}
	else if(this.state.username == '' && this.state.password == '') {
		Alert.alert('No username or password...thats awks')
	}
	else if(this.state.password == '') {
		Alert.alert('No password...thats awks')
	}
	else if(this.state.username == '') {
		Alert.alert('No username...thats awks')
	}
	else {
		Alert.alert('Something went wrong :/')
	}

	let ws = `https://intellibrush-f36bf.firebaseio.com/user.json`
    let xhr = new XMLHttpRequest();
    xhr.open('GET', ws);
    xhr.onload = () => {
     
    if (xhr.status===200) {
        //console.warn(this.state.username)
        console.warn(xhr.responseText)
        var userInfo = JSON.parse(xhr.responseText)
        console.log(userInfo)
        console.log("meow")
        for(var i = 0; i < userInfo.length; i++) {
        	console.log("grr")
        	console.log(userInfo[i])
        	console.log(userInfo[i])
        	if(userInfo[i].name == "mashbeck") {
        		console.log("yay");
        	}
        }
       
    } else {
        Alert.alert(
          'Login Failed',      
  		)
              

  //
    }
    }; xhr.send()
    this.renderBody 
	console.log("m");

}

press() {

}
}

const styles = StyleSheet.create({
 	scroll: {
 		paddingTop: -80,
	    backgroundColor: '#FFFFFF',
	    padding: 30,
	    flexDirection: 'column'
    },
    label: {
	    color: '#0d8898',
	    fontSize: 15
    },
    alignRight: {
    	alignSelf: 'flex-end'
	},
	textInput: {
	    height: 30,
	    fontSize: 20,
	    borderBottomWidth: 2,
	    borderColor: '#909090',
	},
	buttonWhiteText: {
	    fontSize: 20,
	    color: '#FFF',
	},
	imagePlace: {
    	alignSelf: 'center',
		marginTop: -30
	},
	buttonBlackText: {
	    fontSize: 20,
	    color: '#595856'
	},
	primaryButton: {
	    backgroundColor: '#8DDBE0'
	},
	footer: {
	   marginTop: -5,
	}
});

