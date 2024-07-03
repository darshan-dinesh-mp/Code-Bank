import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgramsScreen from './Screens/ProgramsScreen';
import ContentScreen from './Screens/ContentScreen';
import HomeScreen from './Screens/HomeScreen';
import LoadingScreen from './Screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Programs" component={ProgramsScreen} />
        <Stack.Screen name="Content" component={ContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
