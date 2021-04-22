import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
import db from '../Config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
import { ListItem, Header, Icon, Card } from 'react-native-elements'

export default class ReceiverDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userID: firebase.auth().currentUser.email,
            receiverID: this.props.navigation.getParam("details")["user_ID"],
            requestID: this.props.navigation.getParam("details")["request_ID"],
            bookName: this.props.navigation.getParam("details")["book_name"],
            reasonToRequest: this.props.navigation.getParam("details")["reason_to_request"],
            receiverName: "",
            receiverContact: "",
            receiverAddress: "",
            docID: "",
        }}

        getReceiverDetails(){
            db.collection("users").where("email_id", "==", this.state.receiverID).get()
            .then(SnapShot=>{
                SnapShot.forEach(doc=>{
                    this.setState({
                        receiverName: doc.data().first_name, 
                        receiverContact: doc.data().contact,
                        receiverAddress: doc.data().address,
                    })
                })
            })
            db.collection("requested_books").where("request_ID", "==", this.state.requestID).get()
            .then(SnapShot=>{
                SnapShot.forEach(doc=>{
                    this.setState({
                        docID: doc.id
                    })
                })
            })    
        }

        updateBookStatus=()=>{
             db.collection("all_donations").add({
                 book_name: this.state.bookName,
                 request_ID: this.state.requestID,
                 requested_by: this.state.receiverName,
                 donor_ID: this.state.userID,
                 request_status: "Donor Interested"
             })
        }

        componentDidMount(){
           this.getReceiverDetails()
        }

        render(){
            return(
                <View>
                  <Header
                  leftComponent = {
                      <Icon
                      name = "arrow-left" type = "feather" color = "green" onPress = {
                          ()=>{
                              this.props.navigation.goBack()
                          }
                      }
                      />
                  }
                  centerComponent = {
                      {
                          text: "Donate A Book",
                          style = {color: "orange", fontSize: 20, fontWeight: "bold"}
                      }
                  }
                  backgroundColor = "red"
                  />
                  <Card
                  title = {"Book Information"}
                  titleStyle = {{fontSize: 20}}
                  >
                  <Card>
                      <Text style = {{fontWeight: "bold"}}>
                          Name: {this.state.bookName} 
                      </Text>
                  </Card>
                   <Card>
                      <Text style = {{fontWeight: "bold"}}>
                          Reason: {this.state.reasonToRequest} 
                      </Text>
                  </Card>
                  </Card>
                  <Card
                  title = {"Receiver Information"}
                  titleStyle = {{fontSize: 20}}
                  >
                  <Card>
                      <Text style = {{fontWeight: "bold"}}>
                          Name: {this.state.receiverName} 
                      </Text>
                  </Card>
                   <Card>
                      <Text style = {{fontWeight: "bold"}}>
                          Address: {this.state.address} 
                      </Text>
                  </Card>
                  <Card>
                      <Text style = {{fontWeight: "bold"}}>
                          Contact: {this.state.contact} 
                      </Text>
                  </Card>
                  </Card>
                  <View>
                      {
                          this.state.receiverID !== this.state.userID
                          ?(
                              <TouchableOpacity>
                                  onPress = {()=>{
                                      this.updateBookStatus()
                                      this.props.navigation.navigate("MyDonations")
                                  }}
                                  <Text>
                                  I want to donate.
                                  </Text>
                              </TouchableOpacity>
                          )
                          : null
                      }
                  </View>
                </View>
            )
        }
    
}