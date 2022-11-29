import React, { useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';


//Applications main Chat component that renders the chat UI
export default class Chat extends React.Component {
    
    componentDidMount() {
        //TAKES USERNAME FROM START SCREEN TO USE AS DISPLAY NAME FOR NAV BAR TITLE
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
    }

    render() {
        // USES COLOR FROM START SCREEN AS BACKGROUND COLOR FOR CHAT SCREEN 
        let color = this.props.route.params.color;
        return (
            <View style={{
                flex:1, 
                justifyContent: 
                'center', 
                alignItems: 'center',
                backgroundColor: color
                }} 
            >
                <Text style={styles.chatText}>THIS IS FOR CHATTING WITH FRIENDS!</Text>
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    chatText: {
        fontSize: 30,
        justifyContent: 'center'
    },
  });