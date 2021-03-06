import React, {Component} from 'react';
import {View, Text, Platform, StyleSheet, TouchableHighlight, Image, BackHandler, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import {connect} from 'react-redux';
import {setActiveChat, sendMessage, monitorChat, monitorChatOff} from '../actions/ChatActions';
import MensagemItem from '../components/ConversaInterna/MensagemItem';

export class ConversaInterna extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,        
        headerLeft: (
            <TouchableHighlight onPress={()=>{navigation.state.params.voltarFunction()}} underlayColor={false}>
                <Image source={require('../../node_modules/react-navigation-stack/src/views/assets/back-icon.png')} 
                    style={{width:25, height:25, marginLeft:20}}/>
            </TouchableHighlight>
        )
    })

    constructor(props) {
        super(props);
        this.state = {
            inputText:''
        };
        this.voltar = this.voltar.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({voltarFunction:this.voltar});
        BackHandler.addEventListener('hardwareBackPress', this.voltar);
        this.props.monitorChat(this.props.activeChat);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.voltar);        
    }

    voltar() {
        this.props.monitorChatOff(this.props.activeChat);
        this.props.setActiveChat('');
        this.props.navigation.goBack();
        return true;
    }

    sendMsg() {
        let txt = this.state.inputText;
        let state = this.state;
        state.inputText = '';
        this.setState(state);
        
        this.props.sendMessage(txt, this.props.uid, this.props.activeChat);

    }

    render() {
        let areaBehavior = Platform.select({ios: 'padding', android:null});
        let areaOffset = Platform.select({ios: 64, android:null});
        return (
            <KeyboardAvoidingView style={styles.container} behavior={areaBehavior} keyboardVerticalOffset={areaOffset}>
               <FlatList 
                    ref={(ref)=>{ this.chatArea = ref }}
                    onContentSizeChange={()=>{ this.chatArea.scrollToEnd({animated:true}) }}   
                    onLayout={()=> this.chatArea.scrollToEnd({animated:true})} 
                    style={styles.chatArea}
                    data={this.props.activeChatMessages}
                    renderItem={({item})=><MensagemItem data={item} me={this.props.uid} />}
               />
               <View style={styles.sendArea}>
                    <TextInput placeholder="Digite aqui..." style={styles.sendInput} value={this.state.inputText} onChangeText={(inputText)=>this.setState({inputText})}/>
                    <TouchableHighlight style={styles.sendButton} onPress={this.sendMsg}>
                        <Image style={styles.sendImage} source={require('../assets/images/send.png')}/>
                    </TouchableHighlight>
               </View> 
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    chatArea:{
        flex:1,
        backgroundColor: '#CCCCCC'
    },
    sendArea:{
        height:50,
        backgroundColor:'#EEEEEE',
        flexDirection:'row',
        borderRadius:40
    },
    sendInput:{
        height:45,
        flex:1,
        padding:10
    },
    sendButton:{
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center'
    },
    sendImage:{
        width:30,
        height:30
    }
});

const mapStateToProps = (state) => {
    return {
        status: state.auth.status,
        uid: state.auth.uid,
        activeChat: state.chat.activeChat,
        activeChatMessages:state.chat.activeChatMessages
    };
};

const ConversaInternaConnect = connect(mapStateToProps, { setActiveChat, sendMessage, monitorChat, monitorChatOff })(ConversaInterna);
export default ConversaInternaConnect;