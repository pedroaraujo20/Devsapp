import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ConversasList from './ConversasList';
import ConversaInterna from './ConversaInterna';

const ConversasStackNavigator = createStackNavigator({
    ConversasList:{
        screen:ConversasList
    },
    ConversaInterna: {
        screen:ConversaInterna
    }
},{
    animationEnabled:true
});

const ConversasStackContainer = createAppContainer(ConversasStackNavigator);

export default ConversasStackContainer;
