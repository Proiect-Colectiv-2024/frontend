import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'
import axios from 'axios'
import { AuthContext } from '@/app/AuthProvider'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setUser } = useContext(AuthContext)!
  const router = useRouter()

  const handleLogin = () => {
    axios
      .get(`http://localhost:8080/users/username/${username}`)
      .then((response) => {
        setUser(username)
        router.replace({
          pathname: '/',
        })
      })
      .catch(() => {
        console.log("Error! Couldn't find user.")
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log in</Text>
      <TextInput
        style={styles.input}
        placeholder='Username'
        placeholderTextColor='#A2A2A2'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor='#A2A2A2'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  )
}

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
    fontFamily: 'Sora',
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
    fontFamily: 'Sora',
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
    fontFamily: 'Sora',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
})

export default LoginPage
