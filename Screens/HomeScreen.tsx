import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Programs', { categoryId: item.id, categoryName: item.name, categoryDesc: item.description })}>
            <Text style={styles.itemText}>{item.name}</Text>
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
    padding: 20,
    backgroundColor: '#22223B',
    borderRadius: 10,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;
