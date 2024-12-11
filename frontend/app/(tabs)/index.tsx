import React, {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native'
import axios from 'axios'
import {useLocalSearchParams} from "expo-router";

interface IChallenge {
  id: number;
  status: string;
  type: string;
  description: string;
}
export default function HomeScreen() {
  const  username  = useLocalSearchParams();
  console.log(username);
  const [challenges, setChallenges] = useState<IChallenge[]>([]);

  useEffect(() => {
    axios.get(' http://localhost:8080/challenges').then((response) => {
      setChallenges(response.data);
      console.log(response.data)
    })
  }, []);
  const [selectedType, setSelectedType] = useState<
    'history' | 'daily' | 'weekly'
  >('history')

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<IChallenge | null>(
    null
  )

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

  const openModal = (challenge: IChallenge) => {
    setSelectedChallenge(challenge)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedChallenge(null)
  }

  const renderChallengeCard = ({ item }: { item: IChallenge }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)} key={item.id}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.description}>
            {item.description}
            <View style={styles.iconContainer}>
              {item.status === 'completed' && (
                  <Ionicons name='checkmark-circle' size={30} color='green' />
              )}
              {item.status === 'missed' && (
                  <Ionicons name='close-circle' size={30} color='red' />
              )}
            </View>
          </Text>
          <Text style={styles.status}>
            Challenge {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
      {/* Modal for challenge description */}
      <Modal
        visible={modalVisible}
        transparent
        animationType='none'
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Icon */}
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={closeModal}
            >
              <Ionicons name='close' size={15} color='black' />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {selectedChallenge?.description}
            </Text>

            {selectedChallenge?.status === 'completed' ||
            selectedChallenge?.status === 'missed' ? (
              <Text style={styles.modalDescription}>
                You {selectedChallenge.status} this challenge.
              </Text>
            ) : (
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.completedButton}
                  onPress={closeModal}
                >
                  <Text style={styles.completedButtonText}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.missedButton}
                  onPress={closeModal}
                >
                  <Text style={styles.missedButtonText}>Missed</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
    padding: 10,
    alignItems: 'flex-start',
  },
  cardContent: {
    flex: 1,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  status: {
    fontSize: 14,
    color: '#999',
    top: 5
  },
  iconContainer: {
    marginLeft: 10,
    top: 10, // Adds space between the text and the icon
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    position: 'relative', // Required for positioning the "X" icon
  },
  closeIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  completedButton: {
    backgroundColor: '#F7A348',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 0.45,
  },
  completedButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  missedButton: {
    backgroundColor: '#00008B',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 0.45,
  },
  missedButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
