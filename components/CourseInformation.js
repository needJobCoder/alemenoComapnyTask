import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { GlobalContext } from '../App';
import { FlatList } from 'react-native-gesture-handler';

const RenderSyllabus = () => {
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

  const renderSyllabusItem = ({ item }) => {
    return (
      <View key={item.id} style={styles.itemContainer}>
        <TouchableOpacity>
          <Text style={styles.weekText}>Week {item.week}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.topicText}>{item.topic}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.contentText}>Content: {item.content}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={currentSelectedCourse.syllabus}
      renderItem={renderSyllabusItem}
    />
  );
};

function CourseInformation() {
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
    <View style={styles.container}>
      <TouchableOpacity>
        <Text
          style={styles.courseName}
          onPress={() => console.log(currentSelectedCourse)}>
          {currentSelectedCourse.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.instructorText}>
          {currentSelectedCourse.instructor}
        </Text>
      </TouchableOpacity>
      <RenderSyllabus />
      <TouchableOpacity>
        <Text style={styles.durationText}>
          Duration: {currentSelectedCourse.duration}, Schedule:{' '}
          {currentSelectedCourse.schedule}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{ ...styles.topicText, color: 'red' }}>
          EnrollmentStatus: {currentSelectedCourse.enrollmentStatus}
        </Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: '#04AA6D',
            color: 'white',
            padding: 10,
            borderRadius: 4,
            width: '40%',
            textAlign: 'center',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
             if(currentSelectedCourse.enrollmentStatus === 'Closed')
             {
              Alert.alert("Enrollment Closed");
              return;
             }
              const getCourseId = item => {
                if (currentSelectedCourse.id === item.id) {
                  return true;
                }
              };

              const index = courseDataModel.findIndex(getCourseId);
              console.log("courseIndex " + index);

              // check for duplicates
              const CheckIfUserAlreadyEnrolled = item => {
                if (username === item.name) {
                  return true;
                }
              };

              const i = courseDataModel[index].students.findIndex(
              CheckIfUserAlreadyEnrolled)

              if(i !== -1)
              {
                Alert.alert("userExists")
              }

              




              if (i !== -1) {
                Alert.alert("userNotCreated")
                return;
              }

              const model = courseDataModel;
              model[index].students.push({
                id: courseDataModel[index].students.length + 1,
                name: username,
                email: email,
              });
              setCourseDataModel([...model]);
              for (let course of courseDataModel) {
                console.log(course.students);
              }

              Alert.alert("userCreated")
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  instructorText: {
    fontSize: 18,
  },
  itemContainer: {
    marginBottom: 10,
  },
  weekText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topicText: {
    fontSize: 16,
  },
  contentText: {
    fontSize: 14,
  },
  durationText: {
    fontSize: 16,
  },
});

export default CourseInformation;
