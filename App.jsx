import React from 'react';
import Home from './src/screens/Home';
import CarPage from './src/screens/CarList';
import Icon from 'react-native-vector-icons/Feather';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './src/screens/Profile';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name={'home'} size={25} color="#A43333" />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: true,
          tabBarIcon: () => <Icon name={'list'} size={25} color="#A43333" />,
        }}
        name="Daftar Mobil"
        component={CarPage}
      />
      <Tab.Screen
        options={{
          headerShown: true,
          tabBarIcon: () => <Icon name={'user'} size={25} color="#A43333" />,
        }}
        name="Akun"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="homeTabs"
          component={Tabs}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignUp"
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
