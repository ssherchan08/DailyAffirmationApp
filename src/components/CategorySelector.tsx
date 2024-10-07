import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setAffirmation } from '../reducers';
import colors from '../constants/colors';
import categories from '../constants/categories';


const CategorySelector = () => {
  const dispatch = useDispatch();

  const handleSelectCategory = (category: keyof typeof categories) => {
    const affirmations = categories[category];
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    dispatch(setAffirmation(randomAffirmation));
  };

  return (
    <View style={styles.container}>
      <Button title="Motivation" onPress={() => handleSelectCategory('motivation')} color={colors.primary} />
      <Button title="Self Love" onPress={() => handleSelectCategory('selfLove')} color={colors.secondary} />
      <Button title="Positivity" onPress={() => handleSelectCategory('positivity')} color={colors.accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});

export default CategorySelector;
