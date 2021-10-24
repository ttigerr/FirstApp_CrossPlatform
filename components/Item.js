import React from 'react'
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'

 
export const ItemList = (props) => {

    return (
      <View style={(props.status) ? styles.done : styles.container}>
        <Text style= {(props.status) ? styles.textDone : styles.title}>{props.text}</Text>
        <Button title="Delete" onPress={() => props.delete(props.id)}/>
        <Button title="Done" onPress={() => props.done(props.id)}/>
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
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    textDone: {
        flex: 1,
        color: "#298133",
        fontWeight: 'bold',
        fontSize: 18,
    },
    done: {
        padding: 10,
        backgroundColor: '#CFF7D4',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        padding: 30,
        borderRadius: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    },
})