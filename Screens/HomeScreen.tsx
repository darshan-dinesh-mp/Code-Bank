import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Modal, Animated, TouchableWithoutFeedback, Linking } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [contact, setContact] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    if (contact) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [contact, opacity]);

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
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setContact(!contact)}
      >
        <FontAwesomeIcon icon={faCircleQuestion} size={24} color="#22223B" />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={contact}
        animationType="none"
        onRequestClose={() => setContact(false)}
      >
        <TouchableWithoutFeedback onPress={() => setContact(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.modalContent, { opacity }]}>
                <Text style={styles.modalTitle}>Hey there!</Text>
                <Text style={styles.modalText}>Raise issue in my <Text style={{ fontWeight: '500', textDecorationLine: 'underline', color: 'darkblue' }} onPress={() => Linking.openURL('https://github.com/nu23mca28')}>GitHub</Text></Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setContact(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View >
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
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#EEEEF6',
    borderRadius: 30,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#22223B',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#22223B',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#22223B',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
