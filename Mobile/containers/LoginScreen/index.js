import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import LoginButton from "../../components/LoginButton";
import FormTextInput from "../../components/FormTextInput";
import imageLogo from "../../assets/nutricionist.jpg";

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#D8D8F6',
    },
    headerTintColor: '#000000',

  };

  handleEmailChange = (email) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleLoginPress = () => {
    console.log("Login button pressed");
    this.props.navigation.navigate('Home')
  };



  render() {
    return (
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            placeholder={'Email'}
          />
          <FormTextInput
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={'Password'}
          />
          <LoginButton label={'Log In'} onPress={this.handleLoginPress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});
