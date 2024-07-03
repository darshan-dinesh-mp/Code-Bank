import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, Animated } from 'react-native';

const LoadingScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 1200);

        const timeout = setTimeout(() => {
            navigation.replace('Home');
        }, 4000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigation, fadeAnim]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../android/app/src/main/res/mipmap-mdpi/image.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Welcome To <Text style={{ fontWeight: '900' }}>Code Bank</Text></Text>
            <Image
                source={require('../assets/loading.gif')}
                style={styles.gif}
            />
            <Animated.Text
                style={{
                    color: '#22223B',
                    fontFamily: 'monospace',
                    fontWeight: '900',
                    opacity: fadeAnim,
                }}
            >
                ‹loading›
            </Animated.Text>
            <Text style={{ color: 'gray', fontSize: 10, position: 'absolute', bottom: 0 }}>Made by d_rsh_n</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    gif: {
        width: 30,
        height: 30,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 20,
        color: '#22223B'
    },
});

export default LoadingScreen;
