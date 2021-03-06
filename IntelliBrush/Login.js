import React, { Component } from 'react';
import Container from './components/Container';
import Button from './components/Button';
import Label from './components/Label';
import Overview from './Overview';
 
import {
  StyleSheet,
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
      username: '',
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
        	<Container>
    			<Label text="Username or Email" />
    			<TextInput ref={component => this._textInput = component} style={styles.textInput} onChangeText={(text) => this.setState({username:text})}/>
			</Container>
			<Container>
    			<Label text="Password" />
    			<TextInput ref={component => this._textInput2 = component} secureTextEntry={true} style={styles.textInput} onChangeText={(text) => this.setState({password:text})}/>
			</Container>
			<Container>
				<Button styles={{button: styles.transparentButton}} onPress={this.press.bind(this)}>
				</Button>
    		</Container>
    		<View style={styles.footer}>
	    		<Container>
	        		<Button label="Sign In" styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}  onPress={() => navigate('Overview')} />
	    		</Container>
    			<Container>
			        <Button label="CANCEL" styles={{label: styles.buttonBlackText}} onPress={this.clearText} />
		    	</Container>
			</View>
        </ScrollView>
    );
  }

pressSignIn() {
	//const { navigate } = this.props.navigation;
	//navigate('Overview');
	console.log("m");

}
pressCancel() {
  console.log("r");
  this.state.username = "";
}
press() {

}
}

const styles = StyleSheet.create({
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
	buttonBlackText: {
	    fontSize: 20,
	    color: '#595856'
	},
	primaryButton: {
	    backgroundColor: '#8DDBE0'
	},
	footer: {
	   marginTop: 60
	}
});

