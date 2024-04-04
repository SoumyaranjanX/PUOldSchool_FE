import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './src/screens/home/Home';
import Community from './src/screens/community/Community';
import Action from './src/screens/action/Action';
import SignIn from './src/screens/auth/SignIn';
import SignUp from './src/screens/auth/SignUp';
import Profile from './src/screens/profile/Profile';
import Announcement from './src/screens/annoucement/Announcement';
import SearchStop from './src/screens/transportation/SearchStop';
import RequestEvent from './src/screens/events/RequestEvent';
import Map from './src/screens/map/Map';
import SelectComplaint from './src/screens/complaints/SelectComplaint'
import Electrical from './src/screens/complaints/Electrical';
import AllEvents from './src/screens/events/AllEvents';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated on app startup
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        // User is authenticated
        setIsAuthenticated(true);
      } else {
        // User is not authenticated
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('Error checking authentication status:', error);
    } finally {
      setIsLoading(false); // Mark loading as complete regardless of the outcome
    }
  };

  // If still loading, return a loading indicator
  if (isLoading) {
    return null; // You can render a loading spinner here
  }

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? 'Home' : 'SignIn'}
          screenOptions={{
            headerShown: false,
          }}>
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Community" component={Community} />
              <Stack.Screen name="Action" component={Action} />
              <Stack.Screen name="SearchStop" component={SearchStop} />
              <Stack.Screen name="Announcement" component={Announcement} />
              <Stack.Screen name="RequestEvent" component={RequestEvent} />
              <Stack.Screen name="Map" component={Map} />
              <Stack.Screen name="SelectComplaint" component={SelectComplaint} />
              <Stack.Screen name="ElectricalComplaint" component={Electrical} />
              <Stack.Screen name="AllEvents" component={AllEvents} />

              <Stack.Screen name="Profile" >
                {(props) => <Profile {...props} onSignOut={handleSignOut} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn">
                {(props) => <SignIn {...props} onSignIn={handleSignIn} />}
              </Stack.Screen>

              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}
