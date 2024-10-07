import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

const Settings = () => {
  const handleSetDefaultCategory = async (category: string) => {
    await AsyncStorage.setItem('defaultCategory', category);
  };

  return (
    <View style={styles.container}>
      <Button title="Set Default to Motivation" onPress={() => handleSetDefaultCategory('motivation')} color={colors.primary} />
      <Button title="Set Default to Self Love" onPress={() => handleSetDefaultCategory('selfLove')} color={colors.secondary} />
      <Button title="Set Default to Positivity" onPress={() => handleSetDefaultCategory('positivity')} color={colors.accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default Settings;
