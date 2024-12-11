import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from "axios";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleLogin = () => {
        axios.get(`http://localhost:8080/users/username/${username}`).then((response) => {
            router.replace({
                pathname: '/',
                params: { username }, // Pass username as a query parameter
            });
        }).catch(() => {
            console.log("Error! Couldn't find user.")
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Log in</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#A2A2A2"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#A2A2A2"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00008B',
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#000000',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFA500',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    }
});

export default LoginPage;
