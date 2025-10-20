import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStack from './AppStack'

const AppNav = () => {
  return (
    <View style={styles.container}>
      <AppStack />
    </View>
  )
}

export default AppNav

const styles = StyleSheet.create({container: {flex:1}})