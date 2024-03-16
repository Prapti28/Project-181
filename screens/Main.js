import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {StyleSheet,
        Text,
        View,
        SafeAreaView,
        Platform,
        Image,
        ScrollView,
        TouchableOpacity } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import {StatusBar} from 'expo-status-bar';

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            hasCamerPermission : null,
            faces: []
        };

        this.onFacesDetected = this.onFacesDetected.bind(this)
    }

    async componentDidMount(){
        const {status} = await Camera.requestPermissionsAsync();
        this.setState({hasCamerPermission: status == "granted"});
    }

    onFacesDetected({faces}){
        this.setState({faces: faces});
    }

    render(){
        var { hasCamerPermission } = this.state;
        if(hasCamerPermission === null){
            return(<View/>);
        }

        if(hasCamerPermission === false){
            return(
                <View style={styles.container}>
                    <Text>No Access to Camera</Text>
                </View>
            )
        }

        return(
            <View style={styles.middleContainer}>
                <Camera
                style={{flex:1}}
                type={Camera.Constants.Type.front}
                faceDetectorSettings={{
                    mode:FaceDetector.Constants.Mode.fast,
                    detectLandmarks: FaceDetector.Landmarks.all,
                    runClassifications: FaceDetector.Constants.Classifications.all
                }}
                onFacesDetected={this.onFacesDetected}
                onFaceDetectionError={this.onFacesDetectionError}/>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
container:{
 flex:1,
 backgroundColor: "#000000",
},
droidSafeArea:{
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
},
upperContainer:{
 flex: 0.13,
 justifyContent: 'center',
 alignItem: 'center',
 backgroundColor: "#000000",
 flexDirection: 'row',
},
appIcon: {
    width: 50,
    height: 50,
    borderRadius: 20,
},
appName: {
    fontSize: 25,
    fontFace: 'ariel',
},
middleContainer: {
    flex:0.67,
},
lowerContainer:{
    flex:0.2,
    backgroundColor: "#000000",
},
lowerTopContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
},
lowerBottomContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
},
})