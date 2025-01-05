import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';

const Stack = createNativeStackNavigator();

const MainNavigator: React.FC = () => {
     return (
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}
        options={{
                headerShown: false,
              }} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} options={{
                headerShown: false,
              }}/>
        <Stack.Screen name="Favorites" component={FavoritesScreen}options={{
                headerShown: false,
              }} />
      </Stack.Navigator>
        );
};

export default MainNavigator;
