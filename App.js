import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ItemList } from './components/Item';

export default function App() {

  // Initialise states
  const [data, setData] = useState([])
  const [ validInput, setValidInput ] = useState(false)
  const [userInput, setUserInput] = useState()
  const [appData, setAppData] = useState(true)

  // check and define the length of the input 
  const onTextChange = (value) => {
    setUserInput(value)
    if(value.length >= 4)
    {
      setValidInput(true)
    }
    else
    {
      setValidInput(false)
    }
  }

  // When user triggers a button then store a new data
  const onSubmit = (event) => {
    const id = new Date().getTime().toString()
    const item = { id: id, name: userInput, status: false }
    setData([...data, item ])
    setUserInput(null)
    setValidInput(false)
  }
  
  // Keep a data store in the app
  const storeData = async () => {
    const stringified = JSON.stringify( data )
    try {
      await AsyncStorage.setItem( "listData" , stringified ) 
    } catch (error) {
      console.log( error )
    }
  }

  const getdata = async () => {
    try {
      const stringified = await AsyncStorage.getItem("listData")
      setData( (stringified !== null) ? JSON.parse(stringified) : [] )
    } catch (error) {
      console.log( error )
    }
  }

  useEffect (() => {
    if(appData) {
      getdata()
      setAppData(false)
    }
    else {
      storeData()
    }
  }, [data])

  // Mark it as completed 
  const updateItemStatus = (id) => {
    let items = [...data]
    items.forEach( (item) => {
      if( item.id === id ) {
        item.status = true
      }
    })
    setData( items )
  }

  // Delete item lists
  const deleteItem = (id) => {
    let items = [...data]
    let newData = items.filter((item) => {
      if (item.id !== id ) {
        return item
      }
    })
    setData(newData)
  }

  const Renderer = ({item}) => 
  (
    <ItemList text = {item.name} 
      delete ={deleteItem} id = {item.id}
      status={item.status}
      done={updateItemStatus}
    />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.text}>TASKS</Text>
      <View style={styles.itemContainer}>
        <Image source={ require('./assets/main_image.png') } style={styles.image}/>
        <TextInput 
          style={styles.inputBar}
          placeholder="Enter a task name" 
          onChangeText={onTextChange}
          value={userInput}/>
        <TouchableOpacity 
          style={ (validInput) ? styles.button : styles.buttonDisabled }
          disabled={ (validInput) ? false : true }
          onPress= {onSubmit}>
          <Text style={styles.textButton}>Create</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={data} keyExtractor={(item) => item.id} renderItem={Renderer} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#D45964',
    marginTop: 80,
    marginLeft: 20,
  },
  image: {
    marginTop: 30,
    height: 250,
    width: 380,
    alignItems: 'center',
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  inputBar: {
    borderColor: '#DDDDDD',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    width: 350,
    marginTop: 30.   
  },
  button: {
    backgroundColor: '#D45964',
    width: 100,
    padding: 10,
    borderRadius: 5,
    margin: 30,
  },
  buttonDisabled: {
    backgroundColor: "lightgray",
    width: 100,
    padding: 10,
    borderRadius: 5,
    margin: 30,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
  },

});
