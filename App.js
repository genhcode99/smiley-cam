import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Camera } from 'expo-camera'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

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
        <View>
          <Text>Has permissions !</Text>
          <StatusBar style='dark-content' />
        </View>
      )
    } else if (hasPermission === false) {
      return (
        <View>
          <Text>Don't have permission for this app</Text>
          <StatusBar style='dark-content' />
        </View>
      )
    } else {
      return (
        <>
          <ActivityIndicator size='small' color='#000000' />
          <StatusBar style='dark-content' />
        </>
      )
    }
  }
}
