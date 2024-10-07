import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { incrementReadCount } from '../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

const AffirmationDisplay = () => {
  const dispatch = useDispatch();
  const affirmation = useSelector((state: any) => state.affirmation.affirmation);
  const readCount = useSelector((state: any) => state.affirmation.readCount);

  const handleReadAffirmation = async () => {
    dispatch(incrementReadCount());
    const newReadCount = readCount + 1;
    await AsyncStorage.setItem('readCount', newReadCount.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.affirmation}>{affirmation}</Text>
      <Button title="Read Affirmation" onPress={handleReadAffirmation} color={colors.accent} />
      <Text style={styles.count}>Read Count: {readCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  affirmation: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.primary,
  },
  count: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: colors.secondary,
  },
});

export default AffirmationDisplay;
