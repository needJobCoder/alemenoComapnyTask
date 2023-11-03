/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {GlobalContext} from '../App';

const CourseItem = ({name, instructor, item}) => {
  const navigation = useNavigation();
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
    <TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setCurrentSelectedCourse(item);
            navigation.navigate('Course');
          }}>
          <Text style={styles.nameText}>{name}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.instructorText}>{instructor}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const RenderCoursesFlatlist = () => {
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

  const RenderCourseItem = ({item}) => {
    return (
      <CourseItem name={item.name} instructor={item.instructor} item={item} />
    );
  };

  if (checkIfSocketExists()) {
    return (
      <FlatList
        data={courseDataModel}
        renderItem={RenderCourseItem}
        scrollEnabled={true}
      />
    );
  }
};

function Courses() {
  const {
    courseDataModel,
    setCourseDataModel,
    getSocket,
    email,
    setEmail,
    username,
    setUsername,
    checkIfSocketExists,
  } = useContext(GlobalContext);

  useEffect(() => {
    checkIfSocketExists();
  }, []);
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: 'lightblue',
            color: 'white',
            padding: 10,
            borderRadius: 4,
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{color: 'white', fontSize: 18}}
            onPress={() => {
              console.log(courseDataModel);
            }}>
            Courses
          </Text>
        </TouchableOpacity>
      </View>
      <RenderCoursesFlatlist />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'lightblue',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructorText: {
    fontSize: 16,
  },
});

export default Courses;
