import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { categories, CategoryKey } from '../constants/categories'; // Assuming categories are stored here
import DailyAffirmationDisplay from '../components/DailyAffirmationDisplay';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [showCategories, setShowCategories] = useState(false); // State to toggle categories visibility

  const handleCategoryPress = (category: CategoryKey) => {
    // Navigate to Category Detail screen with the selected category
    navigation.navigate('CategoryDetail', { category, name: getCategoryName(category) });
  };

    const getCategoryName = (category: CategoryKey) => {
      switch (category) {
        case 'motivation':
          return 'Motivational';
        case 'positivity':
          return 'Positive';
        case 'selfLove':
          return'Self Love';
        default:
          return null;
      }
    };

    const getCategoryTitle = (category: CategoryKey) => {
      switch (category) {
        case 'motivation':
          return 'Motivation';
        case 'positivity':
          return 'Positivity';
        case 'selfLove':
          return'Self Love';
        default:
          return null;
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Affirmation App</Text>
      <Image
        source={require('../assets/images/affirmation.png')}
        style={styles.image}
      />
      <DailyAffirmationDisplay />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowCategories(!showCategories)} // Toggle category visibility
        >
          <Text style={styles.buttonText}>Explore Categories</Text>
          <Image
            source={
              showCategories
                ? require('../assets/images/arrow-up.png') // Up icon when categories are open
                : require('../assets/images/arrow-down.png') // Down icon when categories are closed
            }
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Display categories when the state is true */}
        {showCategories && (
          <FlatList
            data={Object.keys(categories)} // Categories keys
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => handleCategoryPress(item as CategoryKey)}
              >
                <Text style={styles.categoryText}>{getCategoryTitle(item)}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.categoryList}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.buttonText}>View Favorites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f0ef',
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#4D3F72', // Darker pastel purple for the title
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '90%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#D3C4F2', // Light pastel purple for the button background
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 8,
    // marginBottom: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#4D3F72',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#4D3F72',
  },
  categoryList: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  categoryButton: {
    width: '100%',
    backgroundColor: '#F0E4F1', // Light lavender for category buttons
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 3,
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: '#D3C4F2', // Soft border color
    // elevation: 3, // Slight shadow for elevation effect
  },
  categoryText: {
    color: '#4D3F72',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default HomeScreen;
