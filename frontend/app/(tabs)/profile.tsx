import { View, Text, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.blueContainer}></View>

      <View style={styles.card}>
        <Text style={styles.cardTopText}>Challenge of the day</Text>
        <Text style={styles.cardBottomText}>Compliment a stranger!</Text>
      </View>

      <View style={styles.content}>
        <Text>Profile page content</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blueContainer: {
    backgroundColor: '#00008B',
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: '#F7A348',
    padding: 30,
    borderRadius: 20,
    width: '80%',
    height: 140,
    position: 'absolute',
    top: 160,
    left: '10%',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 50,
  },
  cardTopText: {
    color: 'white',
    padding: 5,
    backgroundColor: '#00008B',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 15,
  },
  cardBottomText: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Sora',
    fontWeight: 'semibold',
    textAlign: 'left',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
})
