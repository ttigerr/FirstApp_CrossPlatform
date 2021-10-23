import React from 'react'
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'

 
export const ItemList = (props) => {
    return (
      <View style= {styles.container}>
        <Text>{props.text}</Text>
      </View>
    )
  }

const  styles = StyleSheet.create ({
    container: {
        padding: 10,
        backgroundColor: 'lightgreen',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
})