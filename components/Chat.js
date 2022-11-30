import React, { useEffect } from "react";
import { View, Platform, KeyboardAvoidingView, Text } from 'react-native';

import { Bubble, GiftedChat } from "react-native-gifted-chat";

const firebase = require('firebase');
require('firebase/firestore');

//Applications main Chat component that renders the chat UI
export default class Chat extends React.Component {
    constructor(){
        super();
        this.state = { 
            messages: [],
            uid: 0
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
                name: data.user.name
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
        user: message.user
    });
}

    

    componentDidMount() {
        //TAKES USERNAME FROM START SCREEN TO USE AS DISPLAY NAME FOR NAV BAR TITLE
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        
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

    //Render function adds new message to current message list 
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }), () => {
            this.addMessages();
        });
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
                    user={{ _id: this.state.uid }}
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

       