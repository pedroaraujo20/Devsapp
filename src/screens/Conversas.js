import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import ConversasStack from './ConversasStack';
import ContatoList from './ContatoList';
import Config from './Config';

const ConversasNavigator = createBottomTabNavigator({
    ConversasStack:{
        screen:ConversasStack,
        navigationOptions: {
            tabBarLabel:'Conversas'
        }
    },
    ContatoList: {
        screen:ContatoList
    },
    Config:{
        screen:Config
    }
},{
    animationEnabled:true
});

ConversasStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
  
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
    };
  };

const ConversasContainer = createAppContainer(ConversasNavigator);

export default ConversasContainer;
