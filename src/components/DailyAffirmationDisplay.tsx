import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { categories, CategoryKey } from '../constants/categories';

const DailyAffirmationDisplay: React.FC = () => {
  const [randomAffirmation, setRandomAffirmation] = useState<string>('');
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  const checkAndSetAffirmation = async () => {
    const today = new Date().toDateString();
    const storedDate = await AsyncStorage.getItem('storedDate');
    const storedAffirmation = await AsyncStorage.getItem('storedAffirmation');

    if (storedDate === today && storedAffirmation) {
      setRandomAffirmation(storedAffirmation);
    } else {
      const randomCategoryKey: CategoryKey = getRandomCategoryKey();
      const affirmation = getRandomAffirmation(randomCategoryKey);
      setRandomAffirmation(affirmation);

      await AsyncStorage.setItem('storedDate', today);
      await AsyncStorage.setItem('storedAffirmation', affirmation);
    }
  };

  const getRandomCategoryKey = (): CategoryKey => {
    const categoryKeys = Object.keys(categories) as CategoryKey[];
    const randomIndex = Math.floor(Math.random() * categoryKeys.length);
    return categoryKeys[randomIndex];
  };

  const getRandomAffirmation = (categoryKey: CategoryKey): string => {
    const affirmations = categories[categoryKey];
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex];
  };

  const randomizeAffirmation = async () => {
    const randomCategoryKey: CategoryKey = getRandomCategoryKey();
    const affirmation = getRandomAffirmation(randomCategoryKey);
    setRandomAffirmation(affirmation);

    const today = new Date().toDateString();
    await AsyncStorage.setItem('storedDate', today);
    await AsyncStorage.setItem('storedAffirmation', affirmation);
  };

  useFocusEffect(
    useCallback(() => {
      checkAndSetAffirmation();
    }, [])
  );

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
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
    backgroundColor: '#E9E0F0',
    padding: 25,
    borderRadius: 12,
    width: '90%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  affirmationText: {
    fontSize: 18,
    color: '#4F4F4F',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  randomizeButton: {
    backgroundColor: '#A49CDB',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
});

export default DailyAffirmationDisplay;
