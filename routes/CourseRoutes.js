import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CourseInformation from '../components/CourseInformation';
import Courses from '../components/Courses';

const Stack = createStackNavigator();

function CourseRoutes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen component={Courses} name={"Courses"} />
        <Stack.Screen component={CourseInformation} name={'Course'} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default CourseRoutes;
