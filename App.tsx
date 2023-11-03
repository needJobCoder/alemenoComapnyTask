import React, {useEffect, useState, createContext} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from './components/Dashboard';
import io, {Socket} from 'socket.io-client';
import Login from './components/Login';
import Courses from './components/Courses';

export const GlobalContext = createContext();

const socket = io('http://10.0.2.2:3000');

const Tab = createBottomTabNavigator();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [courseDataModel, setCourseDataModel] = useState();
  const [getSocket, setSocket] = useState<Socket>();
  const [currentSelectedCourse, setCurrentSelectedCourse] = useState();
  const checkIfCourseDataModelExists = (): boolean => {
    if (typeof courseDataModel === 'undefined') {
      return false;
    } else {
      return true;
    }
  };

  const checkIfSocketExists = () => {
    if (typeof getSocket === 'undefined') {
      console.log('socketDoesNotExist');
      return false;
    } else {
      console.log('socketDoesExist');      
      return true;
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected');
      setSocket(socket);
    });

    socket.on('fetchCourseData', (model) => {
      const {courseModel} = model;
      console.log(courseModel);
      setCourseDataModel([...courseModel]);
      console.log(courseDataModel);
      console.log('checkIfCourseDataModelExists');
      console.log(checkIfCourseDataModelExists());
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        courseDataModel,
        setCourseDataModel,
        getSocket,
        email,
        setEmail,
        username,
        setUsername,
        checkIfSocketExists,
        currentSelectedCourse,
        setCurrentSelectedCourse
      }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen component={Login} name="Login" />
          {isLoggedIn ? (
            <>
              <Tab.Screen component={Dashboard} name="Dashboard" />
              <Tab.Screen component={Courses} name="Courses" />
            </>
          ) : null}
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

export default App;
