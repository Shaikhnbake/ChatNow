import React, {Component} from "react";
import { View, Text, Button, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

// DECLARED COLORS FOR BACKGROUND
const backgroundColors = {
    black: '#090C08',
    purple: '#474056',
    grey: '#8A95A5',
    green: '#B9C6AE'
};

//Applications main Start component that renders the welcome screen
export default class Start extends React.Component {
    //two states being used. one for username and one for background color
    constructor(props){
        super(props);
        this.state = { name: '', color: 'black' };
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground
                    source={require('../assets/background-image.png')}
                    style={styles.image}
                >
                    <Text style={styles.appTitle}>ChatNow!</Text>
                    <View style={styles.startBox}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                            placeholder='Enter your Chat Username!'
                        />
                        <View style={styles.colorsBox}>
                            <Text style={styles.colorsText}>Choose Background Color:</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <TouchableOpacity 
                                style={[ styles.color, {backgroundColor: backgroundColors.black} ]}
                                onPress={() => this.setState({color: backgroundColors.black})}
                                 />
                                 <TouchableOpacity 
                                style={[ styles.color, {backgroundColor: backgroundColors.purple} ]}
                                onPress={() => this.setState({color: backgroundColors.purple})}
                                 />
                                 <TouchableOpacity 
                                style={[ styles.color, {backgroundColor: backgroundColors.grey} ]}
                                onPress={() => this.setState({color: backgroundColors.grey})}
                                 />
                                 <TouchableOpacity 
                                style={[ styles.color, {backgroundColor: backgroundColors.green} ]}
                                onPress={() => this.setState({color: backgroundColors.green})}
                                 />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.startChatButton}
                            title="Start Chatting!"
                            onPress={() => 
                                this.props.navigation.navigate('Chat', {
                                    name: this.state.name,
                                    color: this.state.color
                                })
                            }
                        > 
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF'
    },
    startBox: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: '44%',
        width: '88%',
        alignItems: 'center',
        paddingVertical: '5%'
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 50,
        height: 70,
        width: '88%',
        borderColor: 'gray',
        borderWidth: 1
    },
    colorsBox: {
        width: '88%',
        justifyContent: 'center'
    },

    colorsText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 100,
        padding: '3%'
    },

    color: {
        width: 50,
        height: 50,
        // IN ORDER TO CREATE CIRCLE ELEMENT-- BORDER RADIUS = WIDTH/2 .
        borderRadius: 25 
    },
    startChatButton: {
        backgroundColor: '#757083',
        width: '88%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF'
    }
  });