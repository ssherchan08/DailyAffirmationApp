import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import TitleBar from '../components/TitleBar';

const FavoritesScreen: React.FC = () => {
  // Access favorites from the Redux store
  const favorites = useSelector((state: any) => state.favorites); // Adjust according to your store structure

  // Check if there are any favorites
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
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0D3F3',
    // padding: 16,
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
    // textAlign: 'center',
    // marginBottom: 10,
  },
  affirmationContainer: {
    backgroundColor:'#f2f0ef',
    marginBottom: 10,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'column',
  },
  empty: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});
