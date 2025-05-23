import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
        const response = await fetch('https://raw.githubusercontent.com/darshan-dinesh-mp/codebank-data/refs/heads/main/programs.json');
        const data = await response.json();

        const categoriesWithProgramCount = data.categories.map(category => ({
          ...category,
          programCount: category.programs.length,
        }));

        setCategories(categoriesWithProgramCount);
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
              <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
              <Text style={{ fontWeight: '700', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontSize: 12, color: '#EEEEF6', position: 'absolute', right: 0, bottom: 0, padding: 5, borderRadius: 5 }}>Programs: {item.programCount}</Text>
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
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <TouchableOpacity style={{}} onPress={() => setContact(false)}>
                    <FontAwesomeIcon icon={faXmark} size={24} color="#22223B" />
                  </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                  <Text style={styles.modalTitle}>Hello! I am Darshan</Text>
                  <Text style={styles.modalText}>For any questions, feedback, or support, you can reach out to me on </Text>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://github.com/nu23mca28')}>
                      <FontAwesomeIcon icon={faGithub} size={24} color="#22223B" />
                      {/* <Text style={{ fontWeight: '500', textDecorationLine: 'underline', color: 'darkblue' }} onPress={() => Linking.openURL('https://github.com/nu23mca28')}>GitHub</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/darshan-dinesh-mp')}>
                      <FontAwesomeIcon icon={faLinkedin} size={24} color="#22223B" />
                      {/* <Text style={{ fontWeight: '500', textDecorationLine: 'underline', color: 'darkblue' }} onPress={() => Linking.openURL('www.linkedin.com/in/darshan-dinesh-mp')}>LinkedIn</Text> */}
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.modalText, { marginTop: 10 }]}>Thank you for using <Text style={{ fontWeight: '500' }}>Code Bank!</Text></Text>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback >
      </Modal >
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
    right: 30,
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
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22223B',
  },
  modalText: {
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
    color: '#22223B',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
