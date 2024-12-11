import React, {useContext, useState} from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from "axios";
import { AuthContext } from '@/app/AuthProvider';

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setUser } = useContext(AuthContext)!;
    const router = useRouter();

    const handleLogin = () => {
        axios.get(`http://localhost:8080/users/username/${username}`).then((response)=>{
            setUser(username);
            router.replace({
                pathname: '/'
            });
        }).catch(() => {
            console.log("Error! Couldn't find user.")
        })
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
