import { faArrowLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';

const ProgramsScreen = ({ route, navigation }) => {
    const { categoryId, categoryName, categoryDesc } = route.params;
    const [programs, setPrograms] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredPrograms, setFilteredPrograms] = useState([]);

    useEffect(() => {
        async function fetchPrograms() {
            try {
                const response = await fetch('https://raw.githubusercontent.com/nu23mca28/data/main/programs.json');
                const data = await response.json();
                const selectedCategory = data.categories.find(category => category.id === categoryId);
                if (selectedCategory) {
                    setPrograms(selectedCategory.programs);
                }
            } catch (error) {
                console.log('Error fetching programs:', error);
            }
        }
        fetchPrograms();
    }, [categoryId]);

    useEffect(() => {
        if (searchKeyword) {
            const filtered = programs.filter(program =>
                program.title.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            setFilteredPrograms(filtered);
        } else {
            setFilteredPrograms(programs);
        }
    }, [searchKeyword, programs]);

    const renderProgramItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Content', { program: item })}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} size={24} color="#22223B" />
            </TouchableOpacity>
            <View style={{ display: 'flex', marginVertical: 20, }}>
                <Text style={styles.categoryTitle}>{categoryName}</Text>
                <Text style={styles.categoryDescription}>{categoryDesc}</Text>
            </View>
            <View style={styles.searchContainer}>
                {searchKeyword == '' ? <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#898989" style={styles.searchIcon} /> : ''}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search programs"
                    placeholderTextColor="#898989"
                    value={searchKeyword}
                    onChangeText={setSearchKeyword}
                    autoCapitalize="none"
                >
                </TextInput>
            </View>
            <Text style={{ color: '#22223B', fontSize: 16, fontWeight: '700', paddingBottom: 10, borderBottomWidth: 0.2 }}>Programs</Text>
            <FlatList
                data={filteredPrograms}
                renderItem={renderProgramItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 20,
        backgroundColor: 'white',
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#22223B',
        marginBottom: 10,
    },
    categoryDescription: {
        fontSize: 18,
        color: '#22223B',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#EEEEF6",
        borderRadius: 50,
        paddingHorizontal: 15,
        marginBottom: 12,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        color: "#22223B",
        textAlign: "center",
        borderRadius: 50,
        width: '90%',
    },
    itemContainer: {
        backgroundColor: '#EEEEF6',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 5,
        color: '#22223B',
    },
    itemDescription: {
        fontSize: 14,
        color: '#22223B',
    },
});

export default ProgramsScreen;
