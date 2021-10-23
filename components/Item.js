import React from 'react'
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'

 
export const ItemList = (props) => {

    return (
      <View style= {styles.container}>
        <Text style= {styles.title}>{props.text}</Text>
        <Button title="Delete" onPress={() => props.delete(props.id)}/>
      </View>
    )
  }

const  styles = StyleSheet.create ({
    container: {
        padding: 10,
        backgroundColor: '#EBF2FD',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        padding: 30,
        borderRadius: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1,
    },
})