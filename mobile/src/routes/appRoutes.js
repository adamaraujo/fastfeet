/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import DeliveryDetails from '../pages/DeliveryDetails';

const App = createBottomTabNavigator();
const Deliveries = createStackNavigator();

const DeliveriesRoutes = () => {
  return (
    <Deliveries.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: 'Roboto-Bold',
        },
      }}
    >
      <Deliveries.Screen
        screenOptions={{
          headerShown: false,
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Deliveries.Screen
        name="DeliveryDetails"
        options={{
          title: 'Detalhes da encomenda',
        }}
        component={DeliveryDetails}
      />
    </Deliveries.Navigator>
  );
};

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Dashboard"
    tabBarOptions={{
      activeTintColor: '#7D40E7',
      inactiveTintColor: '#999999',
      labelStyle: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
      },
      style: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.08)',
        height: 60,
        paddingTop: 5,
        paddingBottom: 5,
      },
    }}
  >
    <App.Screen
      name="Deliveries"
      component={DeliveriesRoutes}
      options={{
        tabBarLabel: 'Deliveries',
        tabBarIcon: ({ color }) => (
          <Icon name="reorder" color={color} size={25} />
        ),
      }}
    />
    <App.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <Icon name="account-circle" color={color} size={25} />
        ),
      }}
    />
  </App.Navigator>
);

export default AppRoutes;
