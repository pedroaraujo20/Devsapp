import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {checkLogin, changeEmail, changePassword, signInAction} from './actions/AuthActions';

export class SignIn extends Component {
    static navigationOptions = {
        title: 'Login'
    }

    constructor(props) {
        super(props);
        this.state = {};
        console.disableYellowBox = true;
    }  

    render() {
        return (
            <View style={styles.container}>
                <Text>Usuário logado: {this.props.uid}</Text>
               <Text >E-mail</Text>   
               <TextInput style={styles.input} value={this.props.email} onChangeText={this.props.changeEmail}/> 
               <Text >Senha</Text>   
               <TextInput secureTextEntry={true} style={styles.input} value={this.props.password} onChangeText={this.props.changePassword}/> 
               <Button title="Entrar" onPress={() =>{
                   this.props.signInAction(this.props.email, this.props.password);
               }} />          
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        margin:10,
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    input:{
        width:'80%',
        height:50,
        fontSize:23,
        backgroundColor:'#dddddd'
    } 
});

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid,
        email: state.auth.email,
        password: state.auth.password
    };
};

const SignInConnect = connect(mapStateToProps, { checkLogin, changeEmail,changePassword, signInAction })(SignIn);
export default SignInConnect;