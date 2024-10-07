import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { SafeAreaView, StyleSheet } from 'react-native';
import AffirmationDisplay from './src/components/AffirmationDisplay';
import CategorySelector from './src/components/CategorySelector';
import AffirmationHistory from './src/components/AffirmationHistory';
import Settings from './src/components/Settings';
import colors from './src/constants/colors';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <AffirmationDisplay />
          <CategorySelector />
          <AffirmationHistory />
          <Settings />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
});

export default App;
