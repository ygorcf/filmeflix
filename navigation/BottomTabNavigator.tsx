/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabHomeScreen from '../screens/Home';
import MovieDetailsScreen from '../screens/MovieDetails';
import MyList from '../screens/MyList';
import { BottomTabParamList, TabHomeParamList, TabMyListParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabHome"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="TabHome"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarLabel: 'Início'
        }}
      />
      <BottomTab.Screen
        name="TabMyList"
        component={TabMyListNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabHomeParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator initialRouteName="TabHomeScreen">
      <TabOneStack.Screen
        name="TabHomeScreen"
        component={TabHomeScreen}
        options={{ headerTitle: 'Início' }}
      />
      <TabOneStack.Screen
        name="TabHomeMovieDetailsScreen"
        component={MovieDetailsScreen}
        options={{ headerTitle: 'Início' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabMyListParamList>();

function TabMyListNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabMyListScreen"
        component={MyList}
        options={{ headerTitle: 'Minha Lista' }}
      />
    </TabTwoStack.Navigator>
  );
}
