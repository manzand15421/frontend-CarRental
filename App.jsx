import React from 'react';
import Home from './src/screens/Home';
import CarPage from './src/screens/CarList';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import ProfileScreen from './src/screens/Profile';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import carDetail from './src/screens/CarDetail';
import PaymentScreen from './src/screens/Payment';
import PaymentConfirmation from './src/screens/payed';
import { ActivityIndicator } from 'react-native';

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
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
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
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="carDetail"
              component={carDetail}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="payment"
              component={PaymentScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="payed"
              component={PaymentConfirmation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
