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

  const favorites = useSelector((state: any) => state.favorites);

  const [favoriteState, setFavoriteState] = useState(() => {
    return affirmations.reduce((acc, affirmation) => {
      acc[affirmation] = favorites.some((fav: { affirmation: string }) => fav.affirmation === affirmation);
      return acc;
    }, {} as Record<string, boolean>);
  });

  useEffect(() => {
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
      dispatch(removeFavorite(affirmation));
    } else {
      const alreadyFavorited = favorites.some((fav: { affirmation: string }) => fav.affirmation === affirmation);
      if (!alreadyFavorited) {
        dispatch(addFavorite(category, affirmation));
      }
    }

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
                    ? require('../assets/images/heart-filled.png')
                    : require('../assets/images/heart-empty.png')
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
  },
  affirmationContainer: {
    backgroundColor:'#f2f0ef',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  favoriteButton: {
    marginLeft: 10,
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  },
});

export default CategoryDetailScreen;
