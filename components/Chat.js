import React, { useEffect } from "react";
import { View, Platform, KeyboardAvoidingView } from 'react-native';

import { Bubble, GiftedChat } from "react-native-gifted-chat";


//Applications main Chat component that renders the chat UI
export default class Chat extends React.Component {
    constructor(){
        super();
        this.state = { messages: [] }
    }

    componentDidMount() {
        //TAKES USERNAME FROM START SCREEN TO USE AS DISPLAY NAME FOR NAV BAR TITLE
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        
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
    }

    //function adds new message to current message list
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }))
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
                    user={{ _id: 1 }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            </View>
        );
    } 
}
