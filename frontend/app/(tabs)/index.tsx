import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

interface IChallenge {
  id: string
  description: string
  status: 'completed' | 'in progress' | 'missed'
  type: 'daily' | 'weekly'
}

const challenges: IChallenge[] = [
  {
    id: '1',
    description: 'Meditate for 10 minutes',
    status: 'completed',
    type: 'daily',
  },
  {
    id: '2',
    description: 'Read a chapter of a book',
    status: 'in progress',
    type: 'daily',
  },
  {
    id: '3',
    description: 'Exercise for 30 minutes',
    status: 'missed',
    type: 'weekly',
  },
  {
    id: '4',
    description: 'Exercise for 30 minutes',
    status: 'in progress',
    type: 'weekly',
  },
  {
    id: '5',
    description: 'Exercise for 30 minutes',
    status: 'in progress',
    type: 'daily',
  },
  // Additional Challenges
  {
    id: '6',
    description: 'Drink 8 glasses of water',
    status: 'completed',
    type: 'daily',
  },
  {
    id: '7',
    description: 'Walk 10,000 steps',
    status: 'in progress',
    type: 'daily',
  },
  {
    id: '8',
    description: 'Plan next week’s tasks',
    status: 'missed',
    type: 'weekly',
  },
  {
    id: '9',
    description: 'Write a gratitude journal entry',
    status: 'in progress',
    type: 'daily',
  },
  {
    id: '10',
    description: 'Call a friend or family member',
    status: 'in progress',
    type: 'weekly',
  },
  {
    id: '11',
    description: 'Do 10 push-ups',
    status: 'completed',
    type: 'daily',
  },
  {
    id: '12',
    description: 'Prepare a healthy meal',
    status: 'in progress',
    type: 'weekly',
  },
  {
    id: '13',
    description: 'Read a personal development article',
    status: 'missed',
    type: 'daily',
  },
  {
    id: '14',
    description: 'Organize your workspace',
    status: 'in progress',
    type: 'weekly',
  },
  {
    id: '15',
    description: 'Journal for 10 minutes',
    status: 'completed',
    type: 'daily',
  },
  {
    id: '16',
    description: 'Run for 20 minutes',
    status: 'in progress',
    type: 'weekly',
  },
]

export default function HomeScreen() {
  const [selectedType, setSelectedType] = useState<
    'history' | 'daily' | 'weekly'
  >('history')

  const filteredChallenges = challenges.filter((challenge) => {
    if (selectedType === 'history') {
      return challenge.status === 'completed' || challenge.status === 'missed'
    } else if (selectedType === 'daily') {
      return challenge.status === 'in progress' && challenge.type === 'daily'
    } else if (selectedType === 'weekly') {
      return challenge.status === 'in progress' && challenge.type === 'weekly'
    }
    return false
  })

  const renderChallengeCard = ({ item }: { item: IChallenge }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.status}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)} challenge
        </Text>
      </View>

      {/* Icon on the right side based on challenge status */}
      <View style={styles.iconContainer}>
        {item.status === 'completed' && (
          <Ionicons name='checkmark-circle' size={30} color='green' />
        )}
        {item.status === 'missed' && (
          <Ionicons name='close-circle' size={30} color='red' />
        )}
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.blueContainer}></View>

      <View style={styles.cardDaily}>
        <Text style={styles.cardTopText}>Challenge of the day</Text>
        <Text style={styles.cardBottomText}>Compliment a stranger!</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedType === 'history' && styles.selectedButton,
            ]}
            onPress={() => setSelectedType('history')}
          >
            <Text
              style={[
                styles.buttonText,
                selectedType === 'history' && styles.selectedButtonText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedType === 'daily' && styles.selectedButton,
            ]}
            onPress={() => setSelectedType('daily')}
          >
            <Text
              style={[
                styles.buttonText,
                selectedType === 'daily' && styles.selectedButtonText,
              ]}
            >
              Daily
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedType === 'weekly' && styles.selectedButton,
            ]}
            onPress={() => setSelectedType('weekly')}
          >
            <Text
              style={[
                styles.buttonText,
                selectedType === 'weekly' && styles.selectedButtonText,
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
        </View>

        {/* List of Challenge Cards */}
        <ScrollView style={styles.challengeList}>
          {filteredChallenges.map((item) => renderChallengeCard({ item }))}
        </ScrollView>
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
  cardDaily: {
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
    fontFamily: 'Sora',
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
    marginTop: 80,
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000', // Black text for unselected buttons
    fontSize: 15,
    fontWeight: 'semibold',
  },
  selectedButton: {
    backgroundColor: '#F7A348', // Orange when selected
  },
  selectedButtonText: {
    color: '#FFF', // White text for selected buttons
  },
  challengeList: {
    marginTop: 5, // Adds space between the buttons and the challenge list
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#999',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
