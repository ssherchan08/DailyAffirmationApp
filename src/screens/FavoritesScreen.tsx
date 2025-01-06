import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import TitleBar from '../components/TitleBar';

const FavoritesScreen: React.FC = () => {
  const favorites = useSelector((state: any) => state.favorites);

  const favoriteItems = favorites.map((fav: { affirmation: string }) => fav.affirmation);

  return (
    <View style={styles.main}>
      <TitleBar title={'Your Favorite Affirmations'} />
        {favoriteItems.length > 0 ? (
           <View style={styles.container}>
            <Image
              source={require('../assets/images/favourite.png')}
              style={styles.image}
            />
                    {favoriteItems.map((affirmation, index) => (
                      <View key={index} style={styles.affirmationContainer}>
                        <Text style={styles.content}>{affirmation}</Text>
                      </View>
                    ))}
           </View>
        ) : (
          <View style={styles.emptyContainer}>
                   <Text style={styles.empty}>No favorites added yet.</Text>
            </View>

        )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#E0D3F3',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0D3F3',
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 40,
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
    marginBottom: 10,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  empty: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});
