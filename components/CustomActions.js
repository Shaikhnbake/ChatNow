import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import firebase from 'firebase';
import { firestore } from 'firebase';

export default class CustomActions extends Component {
    //function asks user permission before allowing user to choose photo from their library
    pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

        try {
            if (status === 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images
                }).catch(error => console.log(error));

                if (!result.canceled) {
                    let imageUrl = await this.uploadImageFetch(result.uri);
                    this.props.onSend({ image: imageUrl });
                }
            } 
        } catch (error) {
            console.log(error.message);
        }
    }

    //function asks user permission before allowing user to take photo with their camera
    takePhoto = async () => {
        const { status } = await Permissions.askAsync(
            Permissions.MEDIA_LIBRARY, 
            Permissions.CAMERA
        );
        
        try {
            if (status === 'granted') {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images
                }).catch(error => console.log(error));

                if (!result.canceled) {
                    let imageUrl = await this.uploadImageFetch(result.uri);
                    this.props.onSend({ image: imageUrl });
                }
            } 
        } catch (error) {
            console.log(error.message);
        }
    }

    //function asks user permission before allowing user share their location
    getLocation = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
            if (status === 'granted') {
                    let result = await Location.getCurrentPositionAsync(
                        {}
                    ).catch((error) => console.log(error));

                    const longitude = JSON.stringify(result.coords.longitude);
                    const latitude = JSON.stringify(result.coords.latitude);
                
                    if (result) {
                        this.props.onSend({
                            location: {
                                longitude: result.coords.longitude,
                                latitude: result.coords.latitude
                            }
                        });
                    }
                } 
        } catch (error) {
            console.log(error.message);
        }
    }

    onActionPress = () => {
        const options = [
            'Choose From Library',
            'Take Picture',
            'Send Location',
            'Cancel'
        ]
        const cancelButtonIndex = options.length - 1;
        this.props.showActionSheetWithOptions({
            options,
            cancelButtonIndex
        },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        console.log('user wants to pick an image');
                        return this.pickImage();
                    case 1:
                        console.log('user wants to take a photo');
                        return this.takePhoto();
                    case 2:
                        console.log('user wants to send location');
                        return this.getLocation();
                }
            }
        )
    }

    uploadImageFetch = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        // Creates firebase data of Blob
        const imageNameBefore = uri.split('/');
        const imageName = imageNameBefore[imageNameBefore.length - 1];
        const ref = firebase.storage().ref().child(`images/${imageName}`);
        const snapshot = await ref.put(blob);

        blob.close();

        return await snapshot.ref.getDownloadURL();
    }

    render() {
        return (
            <TouchableOpacity
                accessible={true}
                accessibilityLabel="More options"
                accessibilityHint='Send an image or geolocation'
                style={styles.container}
                onPress={this.onActionPress}
            >
                <View style ={[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center'
    }
});

CustomActions.contextTypes = { actionSheet: PropTypes.func };

CustomActions = connectActionSheet(CustomActions);