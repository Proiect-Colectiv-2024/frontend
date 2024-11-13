import {View, Text, StyleSheet, Image} from 'react-native'
import { useFonts } from 'expo-font'
import React from "react";


export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.blueContainer}>
        <View>

          <Text style={styles.usernameText}>
            <Image
                style={styles.profilePic}
                source={require('../../assets/images/profilePic.png')} />
            Username
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTopText}>Challenge of the day</Text>
        <Text style={styles.cardBottomText}>Compliment a stranger!</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statusContainer}>
          <View style={styles.smallCard}>
            <Image source={require('../../assets/images/check_box.png')} style={styles.icon} />
            <View>
              <Text style={styles.completedText}>Completed</Text>
              <Text style={styles.completedNumber}>348</Text>
            </View>
          </View>
          <View style={styles.smallCard}>
            <Image source={require('../../assets/images/missedIcon.png')} style={styles.icon} />
            <View>
              <Text style={styles.completedText}>Missed</Text>
              <Text style={styles.completedNumber}>50</Text>
            </View>
          </View>
        </View>

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
    fontFamily: 'Sora',
    fontWeight: '300',
    textAlign: 'center',
  },
  cardBottomText: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Sora',
    fontWeight: '700',
    textAlign: 'left',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 100,
  },
  usernameText: {
    color: 'white',
    fontSize: 27,
    fontFamily: 'Sora',
    padding: 10
  },
  profilePic: {
    height: 48,
    width:48,
    padding: 10
  },
  icon: {
    width: 24,
    height: 24,
  },
  smallCard: {
    display: 'flex',
    width: 140,
    padding: 6,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    flexShrink: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: '#00008B',
  },
  completedText: {
    color: '#FFF',
    fontFamily: 'Sora',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  completedNumber: {
    color: '#FFF',
    fontFamily: 'Sora',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  statusContainer: {
    display: 'flex',
    width: 289,
    height: 43,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    gap: 8.5,
    flexShrink: 0,
    flexWrap: 'wrap',
  }
})
