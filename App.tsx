import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { useDispatch } from 'react-redux';
import AffirmationDisplay from './src/components/AffirmationDisplay';
import CategorySelector from './src/components/CategorySelector';
import AffirmationHistory from './src/components/AffirmationHistory';
import Settings from './src/components/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAffirmation } from './src/reducers';
import categories from './src/constants/categories';
import colors from './src/constants/colors';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPreferredAffirmation = async () => {
      const preferredAffirmation = await AsyncStorage.getItem('preferredAffirmation');
      if (preferredAffirmation) {
        dispatch(setAffirmation(preferredAffirmation));
      }

      const defaultCategory = await AsyncStorage.getItem('defaultCategory');
      if (defaultCategory && isCategoryKey(defaultCategory)) {
        const affirmations = categories[defaultCategory];
        const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
        dispatch(setAffirmation(randomAffirmation));
      }
    };

    fetchPreferredAffirmation();
  }, [dispatch]);

  const isCategoryKey = (key: any): key is keyof typeof categories => {
    return key === 'motivation' || key === 'selfLove' || key === 'positivity';
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <ScrollView>
            <AffirmationDisplay />
            <CategorySelector />
            <AffirmationHistory />
            <Settings />
          </ScrollView>
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
});

export default App;
