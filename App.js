import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import { ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
import * as FileSystem from 'expo-file-system'
import styled from 'styled-components'
import { hidden } from 'ansi-colors'
import { Ionicons } from '@expo/vector-icons'
import * as FaceDetector from 'expo-face-detector'

//----------< Styled >----------
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: cornflowerblue;
`

const Text = styled.Text`
  color: white;
  font-size: 22px;
`

const IconBar = styled.View`
  margin-top: 20px;
`
//------------------------------

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasPermission: null,
      cameraType: Camera.Constants.Type.front,
      smileDetected: false,
    }
    this.cameraRef = React.createRef()
  }

  componentDidMount = async () => {
    // 1. 카메라 사용승인 및 상태변경
    const { status } = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      this.setState({
        hasPermission: true,
      })
    } else {
      this.setState({
        hasPermission: false,
      })
    }
  }

  render() {
    const { hasPermission, cameraType, smileDetected } = this.state

    const switchCameraType = () => {
      if (cameraType === Camera.Constants.Type.front) {
        this.setState({
          cameraType: Camera.Constants.Type.back,
        })
        console.log('hi')
      } else {
        this.setState({
          cameraType: Camera.Constants.Type.front,
        })
      }
    }

    //----------< Templete - Screen >----------
    if (hasPermission === true) {
      return (
        <CenterView>
          <Camera
            style={{
              width: WIDTH - 40,
              height: HEIGHT / 1.5,
              borderRadius: 10,
              overflow: hidden,
            }}
            type={cameraType}
            onFacesDetected={smileDetected ? null : this.onFacesDetected}
            faceDetectorSettings={{
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.all,
            }}
            ref={this.cameraRef}
          />
          <IconBar>
            <TouchableOpacity onPress={switchCameraType}>
              <Ionicons name='camera-reverse' size={50} color='white' />
            </TouchableOpacity>
          </IconBar>
          <StatusBar style='dark-content' />
        </CenterView>
      )
    } else if (hasPermission === false) {
      return (
        <CenterView>
          <Text>Don't have permission for this app</Text>
          <StatusBar style='dark-content' />
        </CenterView>
      )
    } else {
      return (
        <CenterView>
          <ActivityIndicator size='small' color='#ffffff' />
          <StatusBar style='dark-content' />
        </CenterView>
      )
    }
  }
  onFacesDetected = ({ faces }) => {
    const face = faces[0]
    if (face) {
      if (face.smilingProbability > 0.7) {
        this.setState({
          smileDetected: true,
        })
        this.takePhoto()
      }
    }
  }
  takePhoto = async () => {
    try {
      if (this.cameraRef.current) {
        let { uri } = await this.cameraRef.current.takePictureAsync({
          quality: 1,
          exif: true,
        })
        if (uri) {
          this.savePhoto(uri)
        }
      }
    } catch (error) {
      alert(error)
      this.setState({
        smileDetected: false,
      })
    }
  }
  savePhoto = async (uri) => {}
}
//------------------------------
