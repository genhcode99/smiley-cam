import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import { ActivityIndicator, Dimensions } from 'react-native'
import styled from 'styled-components'
import { hidden } from 'ansi-colors'

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
//------------------------------

export default class App extends React.Component {
  state = {
    hasPermission: null,
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
    const { hasPermission } = this.state

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
            type={Camera.Constants.Type.front}
          />
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
