import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Games from './src/screens/Games';
import NewGame from './src/screens/NewGame';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewGames from './src/screens/ViewGames';
import NewGameScreenTwo from './src/screens/NewGameScreenTwo';
import { GameProvider } from './contexts/GameContext';
import { NewGameContextProvider } from './contexts/NewGameContext';
import NewGameScreenThree from './src/screens/NewGameScreenThree';
import SingularGame from './src/screens/SingularGame';
import EditCompet from './src/screens/EditScreens/EditCompet';
import EditScores from './src/screens/EditScreens/EditScores';
import EditTeams from './src/screens/EditScreens/EditTeams';
import CameraScreen from './src/screens/CameraScreens/CameraScreen';
import CameraResults from './src/screens/CameraScreens/CameraResults';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home-outline';
      break;
    case 'View Games':
      iconName = 'tennisball-outline'
      break;
    case 'Add Games':
      iconName = 'add'
      break;
    default:
      break;
  }
  return <Ionicons name={iconName} color={color} size={24} />
};

const GameStack = () => {
  return (
    <NewGameContextProvider>
        <Stack.Navigator initialRouteName='ViewGames' >
        <Stack.Screen 
          name="NewGame" 
          component={NewGame} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="NewGameScreenTwo" 
          component={NewGameScreenTwo} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="NewGameScreenThree" 
          component={NewGameScreenThree} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
        name="TakePhoto"
        component={CameraScreen}
        options={{headerShown:false}}
        />   
        <Stack.Screen 
        name="PhotoResult"
        component={CameraResults}
        options={{headerShown:false}}
        />  
      </Stack.Navigator>
    </NewGameContextProvider>
    
  );
}

const ViewStack = () => {
  return (
        <Stack.Navigator initialRouteName='ViewGames' >
        <Stack.Screen 
          name="ListAllGames" 
          component={ViewGames} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
        name="SingularGame"
        component={SingularGame}
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name="EditCompet"
        component={EditCompet}
        options={{headerShown:false}}/>
        <Stack.Screen 
        name="EditScores"
        component={EditScores}
        options={{headerShown:false}}/>
        <Stack.Screen 
        name="EditTeams"
        component={EditTeams}
        options={{headerShown:false}}/>
      </Stack.Navigator>
  );
}

const App = () => {
  return (
    <GameProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color}) => screenOptions(route, color),
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: '#873d48',
            headerStyle: {
              backgroundColor: '#26905b',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerShown: false
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={Home}
          />
          <Tab.Screen 
            name="View Games" 
            component={ViewStack} 
            options={{
              headerShown:false
            }}
          />
          <Tab.Screen 
            name="Add Games" 
            component={GameStack} 
            options={{
              headerShown:false
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
