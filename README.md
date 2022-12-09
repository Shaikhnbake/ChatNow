# ChatNow!
 

## Project description:

	This is a fully functional chat app for mobile devices! This application was built using React Native and provides users with a chat interface and options to share messages, images and their location. Chat conversations will be stored locally, while images will be stored in Google's Firebase Cloud Storage. Users will be authenticated anonymously via Google Firebase. This app is optimized for both Android and iOS devices.


## Deployment

To deploy this project:

```bash
  npx expo start
```

Android Studio's Emulator:
1. Download Android Studio
2. Set up Android Emulator 
  - Must install 'Android Virtual Device'
3. Open SDK Manager from Welcome Screen
  - If not already installed, install 'Android SDK Build-Tools' under SDK Tools tab
  #### MAC USERS ONLY
  - Add Android SDK Location to ~/.zshrc file 
  ```bash
    export ANDROID_SDK=/Users/myuser/Library/Android/sdk
    export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH
  ```
4. Open Virtual Device Manager to create a new device.
5. Click **Play** to start the device.
6. Run on Android Device/Emulator (press 'a' in terminal) in Expo to run app on virtual device.


## Tech Stack

- React Native (+ Gifted Chat)
- Expo App
- Android Studio Emulator
- Google Firebase

## Dependencies

```bash
"@expo/react-native-action-sheet": "^4.0.1",
"@react-native-async-storage/async-storage": "~1.17.3",
"@react-native-community/masked-view": "^0.1.11",
"@react-native-community/netinfo": "9.3.5",
"@react-navigation/native": "^6.0.14",
"@react-navigation/stack": "^6.3.5",
"expo": "~47.0.8",
"expo-image-picker": "~14.0.2",
"expo-location": "~15.0.1",
"expo-permissions": "~14.0.0",
"expo-status-bar": "~1.4.2",
"firebase": "^7.9.0",
"prop-types": "^15.8.1",
"react": "18.1.0",
"react-native": "0.70.5",
"react-native-gesture-handler": "~2.8.0",
"react-native-gifted-chat": "^1.0.4",
"react-native-maps": "1.3.2",
"react-native-reanimated": "~2.12.0",
"react-native-safe-area-context": "4.4.1",
"react-native-screens": "~3.18.0",
"react-navigation": "^4.4.4"

```


## Authors

- [@Shaikhnbake](https://www.github.com/Shaikhnbake)
