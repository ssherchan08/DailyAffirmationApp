import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

const AffirmationHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const historyData = await AsyncStorage.getItem('affirmationHistory');
      if (historyData) {
        setHistory(JSON.parse(historyData));
      }
    };
    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Read Affirmation History:</Text>
      {history.length > 0 ? (
        history.map((item, index) => (
          <Text key={index} style={styles.item}>
            {item}
          </Text>
        ))
      ) : (
        <Text style={styles.noHistory}>No history available</Text>
      )}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.secondary,
  },
  item: {
    fontSize: 16,
    color: colors.text,
  },
  noHistory: {
    fontSize: 16,
    color: colors.primary,
  },
});

export default AffirmationHistory;
