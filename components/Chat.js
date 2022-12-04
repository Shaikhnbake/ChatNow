import React, { useEffect } from "react";
import { View, Platform, KeyboardAvoidingView, Text } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const firebase = require('firebase');
require('firebase/firestore');

//Applications main Chat component that renders the chat UI
export default class Chat extends React.Component {
    constructor(){
        super();
        this.state = { 
            messages: [],
            uid: 0,
            user: {
                _id: '',
                avatar: '',
                name: ''
            }
        }
        
        const firebaseConfig = {
            apiKey: "AIzaSyC9TaBRe-1YElm-E8IdjRK6Kh4elyx6gJA",
            authDomain: "chatnow-17aa5.firebaseapp.com",
            projectId: "chatnow-17aa5",
            storageBucket: "chatnow-17aa5.appspot.com",
            messagingSenderId: "1012497533940"
        };

        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }
        
        this.refrenceChatMessages = firebase.firestore().collection('messages');
    }

onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    //goes through each document in firebase
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        messages.push({
            _id: data._id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: {
                _id: data.user._id,
                name: data.user.name,
                avatar: data.user.avatar || ''
            }
        });
    });
    this.setState({ messages });
};

//function saves messages to firestone database
addMessages() {
    let message = this.state.messages[0];
    this.refrenceChatMessages.add({
        _id: message._id,
        text: message.text,
        createdAt: message.createdAt,
        user: message.user,
        uid: this.state.uid
    });
}

// Asynchronous function that retreives saved messages data
async getMessages(){
    let messages = '';
    try {
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
            messages: JSON.parse(messages)
        });
    } catch (error) {
        console.log(error.message);
    }
};

//// Asynchronous function that saves messages data when sent
async saveMessages(){
    try {
        await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
        console.log(error.message);
    }
}

//// Asynchronous function that deletes saved messages
async deleteMessages(){
    try {
        await AsyncStorage.removeItem('messages');
        this.setState({ messages: [] })
    } catch (error) {
        console.log(error.message);
    }
}

    

    componentDidMount() {
        //TAKES USERNAME FROM START SCREEN TO USE AS DISPLAY NAME FOR NAV BAR TITLE
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        
        //Loads all users saved messages into chatroom
        this.getMessages();
        
        //Checks users connection status
        NetInfo.fetch().then(connection => {
            if(connection.isConnected) {
                this.setState({ isConnected: true });
                console.log('online');
            } else {
                this.setState({ isConnected: false });
                console.log('offline');
            }
        });

        this.refrenceChatMessages = firebase.firestore().collection('messages');



        //Checks if user is signed in // create new user
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
            //updates user state with current active user data
            this.setState({
                uid: user.uid,
                messages: []
            });
            this.unsubscribe = this.refrenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.authUnsubscribe();
    }

    //Render function adds new message to current message list + saves it to async storage
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }), () => {
            this.addMessages();
            this.saveMessages();
        });
    }

    //Renders the chat box only if user is online
    renderInputToolbar(props) {
        if(this.state.isConnected === false){
        } else {
            return ( <InputToolbar {...props} /> );
        }
    }


    //function changes chat text bubble color
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {backgroundColor: 'cyan'},
                    right: {backgroundColor: 'red'}
                }}
            />
        );
    }

    render() {
        // USES COLOR FROM START SCREEN AS BACKGROUND COLOR FOR CHAT SCREEN 
        let color = this.props.route.params.color;
        return (
            <View style={{
                flex: 1, 
                backgroundColor: color
                }} 
            >
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{ _id: this.state.uid, avatar: this.state.avatar }}
                />
                <Text>{this.state.loggedInText}</Text>
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            </View>
        );
    } 
}







{/* 
DEMO CODE . can insert inside component did mount if you do not wish to use firestore database

 //creates chat screen with hello message and system message
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: `Hello my friend ${name}`,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any'
                    }
                },
                {
                    _id: 2,
                    text: `Welcome to the chat room ${name}!`,
                    createdAt: new Date(),
                    system: true
                }
            ]
        });


*/}

       