import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/nu23mca28/data/main/programs.json');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ marginLeft: 10, marginBottom: 20, fontSize: 24, fontWeight: '700', color: '#22223B' }}>
        Subjects
      </Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Programs', { categoryId: item.id, categoryName: item.name, categoryDesc: item.description })}
          >
            <ImageBackground
              source={{ uri: item.backgroundImage }}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#22223B',
  },
  backButton: {
    fontSize: 15,
    fontWeight: '500',
    color: '#22223B',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 10,
    opacity: 1,
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default HomeScreen;
