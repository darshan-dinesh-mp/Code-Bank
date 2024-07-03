import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProgramDetailScreen = ({ route, navigation }) => {
    const { program } = route.params;
    const [copiedText, setCopiedText] = useState('Copy code');

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        setCopiedText('Copied!');
    };

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#22223B" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{program.title}</Text>
            <Text style={styles.description}>{program.description}</Text>
            <View style={{ padding: 10, backgroundColor: '#575366', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', borderTopLeftRadius: 10, borderTopRightRadius: 10, }}>
                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', }}
                    onPress={() => copyToClipboard(program.content)}>
                    <FontAwesomeIcon icon={copiedText == 'Copy code' ? faCopy : faCheck} size={18} color="#EEEEF6" /><Text style={{ color: '#EEEEF6', fontSize: 14, fontFamily: 'inter' }}> {copiedText}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.codeContainer}>
                <Text style={styles.code}>{program.content}</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        color: '#22223B',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#22223B',
        marginBottom: 20,
    },
    codeContainer: {
        backgroundColor: '#EEEEF6',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
    },
    code: {
        fontFamily: 'monospace',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#22223B',
    },
});

export default ProgramDetailScreen;
