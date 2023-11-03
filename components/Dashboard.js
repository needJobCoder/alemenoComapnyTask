/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { GlobalContext } from '../App';

const CourseItem = ({ item }) => {
  const {
    courseDataModel,
    setCourseDataModel,
    getSocket,
    email,
    setEmail,
    username,
    setUsername,
    checkIfSocketExists,
    currentSelectedCourse,
    setCurrentSelectedCourse,
  } = useContext(GlobalContext);

  const checkIfUserExists = () => {
    const doesExist = (_item) => {
      if (_item.name === username) {
        Alert.alert("found")
        return true;
      }
    }

    const index = item.students.findIndex(doesExist);
    console.log(index);
    if (index !== -1) {
      return true;
    }
    else {
      return false;
    }
  }

  if (checkIfUserExists()) {
    return (<TouchableOpacity style={{padding: 10,
      margin: 5,
      borderRadius: 5,
      backgroundColor: 'lightblue',}}>
      <Text>{item.name}</Text>
    </TouchableOpacity>)
  }
  else {
    return <></>
  }
}

const RenderFlatlistCourseItem = ({ item }) => {


  return (<CourseItem item={item} key={item.id} />)

}

const ReturnFlatList = () => {
  const {
    courseDataModel,
    setCourseDataModel,
    getSocket,
    email,
    setEmail,
    username,
    setUsername,
    checkIfSocketExists,
    currentSelectedCourse,
    setCurrentSelectedCourse,
  } = useContext(GlobalContext);



  return (
    <FlatList renderItem={RenderFlatlistCourseItem} data={courseDataModel} />
  )
}

function Dashboard() {
  const {
    courseDataModel,
    setCourseDataModel,
    getSocket,
    email,
    setEmail,
    username,
    setUsername,
    checkIfSocketExists,
    currentSelectedCourse,
    setCurrentSelectedCourse,
  } = useContext(GlobalContext);



  return (
    <View>
      <TouchableOpacity style={{
            backgroundColor: 'lightblue',
            color: 'white',
            padding: 10,
            borderRadius: 4,
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
          }}>
      <Text onPress={() => {
        for (let course of courseDataModel) {
          console.log(course.students);
        }
      }}>Dashboard</Text>
      </TouchableOpacity>
      <ReturnFlatList />
    </View>
  );
}

export default Dashboard;
