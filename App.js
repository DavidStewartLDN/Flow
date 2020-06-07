import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';

import { withAuthenticator } from 'aws-amplify-react-native';

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

const Stack = createStackNavigator();


function App(props) {
  const isLoadingComplete = useCachedResources();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <NavigationContainer linking={LinkingConfiguration}>
        <Stack.Navigator>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    );
  }
}


export default withAuthenticator(App, { includeGreetings: true })


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
