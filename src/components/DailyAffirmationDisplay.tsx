import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { categories, CategoryKey } from '../constants/categories';

const DailyAffirmationDisplay: React.FC = () => {
  const [randomAffirmation, setRandomAffirmation] = useState<string>('');
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  const checkAndSetAffirmation = async () => {
    const today = new Date().toDateString(); // Get today's date
    const storedDate = await AsyncStorage.getItem('storedDate');
    const storedAffirmation = await AsyncStorage.getItem('storedAffirmation');

    // If today's affirmation is already stored, use it; otherwise, generate a new one
    if (storedDate === today && storedAffirmation) {
      setRandomAffirmation(storedAffirmation);
    } else {
      const randomCategoryKey: CategoryKey = getRandomCategoryKey();
      const affirmation = getRandomAffirmation(randomCategoryKey);
      setRandomAffirmation(affirmation);

      // Store today's date and the generated affirmation
      await AsyncStorage.setItem('storedDate', today);
      await AsyncStorage.setItem('storedAffirmation', affirmation);
    }
  };

  // Function to get a random category
  const getRandomCategoryKey = (): CategoryKey => {
    const categoryKeys = Object.keys(categories) as CategoryKey[];
    const randomIndex = Math.floor(Math.random() * categoryKeys.length);
    return categoryKeys[randomIndex];
  };

  // Function to get a random affirmation
  const getRandomAffirmation = (categoryKey: CategoryKey): string => {
    const affirmations = categories[categoryKey];
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex];
  };

  // Function to handle randomizing the affirmation on button press
  const randomizeAffirmation = async () => {
    const randomCategoryKey: CategoryKey = getRandomCategoryKey();
    const affirmation = getRandomAffirmation(randomCategoryKey);
    setRandomAffirmation(affirmation);

    const today = new Date().toDateString();
    await AsyncStorage.setItem('storedDate', today);
    await AsyncStorage.setItem('storedAffirmation', affirmation);
  };

  // Use `useFocusEffect` to check affirmation when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      checkAndSetAffirmation();
    }, [])
  );

  // Use `AppState` to handle app foreground state
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // Check and set affirmation when app comes to the foreground
        checkAndSetAffirmation();
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return (
    <View style={styles.container}>
      <Text style={styles.affirmationText}>{randomAffirmation}</Text>
      <TouchableOpacity style={styles.randomizeButton} onPress={randomizeAffirmation}>
        <Image
            source={require('../assets/images/random.png')}
            style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9E0F0', // Soft lavender background for a calming effect
    padding: 25,
    borderRadius: 12,
    // marginBottom: 30,
    width: '90%', // Keeps it well-contained on the screen
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#000', // Adds a subtle shadow to give depth
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 5, // Shadow effect for Android
  },
  affirmationText: {
    fontSize: 18,
    color: '#4F4F4F', // A darker shade of gray for better readability
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500', // Slightly heavier font weight for emphasis
  },
  randomizeButton: {
    backgroundColor: '#A49CDB', // Soft purple background for the button
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center', // Centers the content inside the button
    justifyContent: 'center',
    // marginTop: 15,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF', // Ensures the icon is white and stands out
  },
});

export default DailyAffirmationDisplay;
