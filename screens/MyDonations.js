import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
import db from '../Config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
import { ListItem, Icon } from 'react-native-elements'

export default class MyDonations extends React.Component {
    
    constructor(){
        super()
        this.state = {
            requestedBookList: [],
            userID: firebase.auth().currentUser.email
        }
        this.requestRef = null

    }

    getAllDonations = ()=>{
        this.requestRef = db.collection('all_donations')
        .onSnapshot((snapShot)=>{
            var allDonations = snapShot.docs.map(document => document.data())
            this.setState({
                requestedBookList: allDonations
            })
        })
    }

    componentDidMount(){
        this.getAllDonations()
    }

    componentWillUnmount(){
         this.requestRef()
    }

    keyExtractor = (item, index)=>index.toString()

    renderItem = ({item, index})=>{
       return(
           <ListItem
           key = {index}
           title = {item.book_name}
           subtitle = {"requested by"+item.requested_by+"\nstatus"+item.request_status}
           titleStyle = {{color: "#00007C", fontWeight: "bold"}}
           rightElement = {
               <TouchableOpacity>
                   <Text style = {{color: 'purple'}}>
                       Send Book
                   </Text>
               </TouchableOpacity>
           }
           leftElement = {
              <Icon
              name = "book" type = "font-awesome" color = "blue"              />
           }
           bottomDivider
           />
       )
    }

    render(){
        return(
            
            <View>
              <MyHeader
              title = 'My Donations'
              navigation = {this.props.navigation}
              />
              {
                  this.state.requestedBookList.length === 0
                  ?(
                      <View>
                          <Text>
                              There are no requested books.
                          </Text>
                      </View>
                  )
                  :(
                      <FlatList
                      keyExtractor = {this.keyExtractor}
                      data = {this.state.requestedBookList}
                      renderItem = {this.renderItem}
                      />
                  )
              }
            </View>
        )
    }
}