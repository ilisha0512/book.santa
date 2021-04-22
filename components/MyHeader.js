import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../Config'
import firebase from 'firebase'
import { Header, Icon, Badge } from 'react-native-elements'

const MyHeader = props => {
    return(
       <Header
       leftComponent = {<Icon name = 'bars' type = 'font-awesome' color = 'blue' onPress = {()=>{
           props.navigation.toggleDrawer()
       }}/>}
       centerComponent = {{text: props.title, style: {color: 'green', fontSize: 20, fontWeight: 'bold'}}}
       backgroundColor = 'purple'
       />
    )
}
export default MyHeader