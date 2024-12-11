import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch(`http://localhost:8081/users/username/${username}`);
            const users = await response.json();

            const userExists = users.some((user: { username: string }) => user.username === username);

            if (userExists) {
                Alert.alert('Login Successful', `Welcome, ${username}!`);
                router.replace('/'); // Navigate to the tabs group
            } else {
                Alert.alert('Login Failed', 'Username not found.');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            Alert.alert('Error', 'Unable to process login.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ripple Effect Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Submit" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
});

export default LoginPage;
