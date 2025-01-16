import { Link, Stack } from 'expo-router'
import { View, StyleSheet } from 'react-native'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!Not found' }} />
      <View style={styles.container}>
        <Link href='/' style={styles.button}>
          Go back to home screen
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    fontSize: 20,
    fontFamily: 'Sora',
    textDecorationLine: 'underline',
  },
})
