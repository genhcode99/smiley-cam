import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import { ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { hidden } from 'ansi-colors'
import { Ionicons } from '@expo/vector-icons'

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
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.front,
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
    const { hasPermission, cameraType } = this.state

    const switchCameraType = () => {
      if (cameraType === Camera.Constants.Type.front) {
        this.setState({
          cameraType: Camera.Constants.Type.back,
        })
      } else {
        this.setState({
          cameraType: Camera.Constants.Type.front,
        })
      }
    }

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
}
