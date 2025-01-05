import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions';
import { categories, CategoryKey } from '../constants/categories';
import TitleBar from '../components/TitleBar';

const CategoryDetailScreen: React.FC = () => {
  const route = useRoute();
  const { category, name } = route.params as { category: CategoryKey, name: string };
  const affirmations = categories[category];
  
  const dispatch = useDispatch();

  // Access favorites from Redux store
  const favorites = useSelector((state: any) => state.favorites); 

  // Initialize the favoriteState based on the Redux store
  const [favoriteState, setFavoriteState] = useState(() => {
    return affirmations.reduce((acc, affirmation) => {
      acc[affirmation] = favorites.some((fav: { affirmation: string }) => fav.affirmation === affirmation);
      return acc;
    }, {} as Record<string, boolean>);
  });

  useEffect(() => {
    // Update the local state whenever favorites change in the Redux store
    setFavoriteState((prevState) => {
      const updatedState = { ...prevState };
      affirmations.forEach((affirmation) => {
        updatedState[affirmation] = favorites.some((fav: { affirmation: string }) => fav.affirmation === affirmation);
      });
      return updatedState;
    });
  }, [favorites, affirmations]);

  const handleToggleFavorite = (affirmation: string) => {
    const isCurrentlyFavorite = favoriteState[affirmation];
    if (isCurrentlyFavorite) {
      // Dispatch remove favorite action
      dispatch(removeFavorite(affirmation));
    } else {
      // Check if the affirmation is already in favorites
      const alreadyFavorited = favorites.some((fav: { affirmation: string }) => fav.affirmation === affirmation);
      if (!alreadyFavorited) {
        // Dispatch add favorite action only if it's not already a favorite
        dispatch(addFavorite(category, affirmation));
      }
    }

    // Toggle the favorite state for the specific affirmation
    setFavoriteState((prevState) => ({
      ...prevState,
      [affirmation]: !prevState[affirmation],
    }));
  };

  const getCategoryImage = (category: CategoryKey) => {
    switch (category) {
      case 'motivation':
        return require('../assets/images/leadership.png');
      case 'positivity':
        return require('../assets/images/yes.png');
      case 'selfLove':
        return require('../assets/images/heart.png');
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
           <TitleBar title={name + ' Affirmations'}/>
      {/* <Text style={styles.title}>{name} Affirmations</Text> */}
      <Image source={getCategoryImage(category)} style={styles.image} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {affirmations.map((affirmation, index) => (
          <View key={index} style={styles.affirmationContainer}>
            <Text style={styles.content}>{affirmation}</Text>
            <TouchableOpacity
              onPress={() => handleToggleFavorite(affirmation)}
              style={styles.favoriteButton}>
              <Image
                source={
                  favoriteState[affirmation]
                    ? require('../assets/images/heart-filled.png') // Filled heart
                    : require('../assets/images/heart-empty.png') // Empty heart
                }
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0D3F3',
    // padding: 16,
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#3A3A3A',
    fontWeight: 'bold',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  content: {
    fontSize: 16,
    color: '#3A3A3A',
    width: '90%',
    // textAlign: 'center',
    // marginBottom: 10,
  },
  affirmationContainer: {
    backgroundColor:'#f2f0ef',
    marginBottom: 20,
    flexDirection: 'row', // Aligns text and heart icon horizontally
    alignItems: 'center', // Vertically centers both text and heart
    justifyContent: 'space-between', // Pushes the text to the left and heart icon to the right
    width: '95%', // Ensures the row takes full width of the screen
    paddingHorizontal: 20, // Adds horizontal padding to the container
    paddingVertical: 10,
    borderRadius: 8,
  },
  favoriteButton: {
    // textAlign: 'right',
    marginLeft: 10, // Space between text and heart icon
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  },
});

export default CategoryDetailScreen;
