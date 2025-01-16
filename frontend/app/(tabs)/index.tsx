import React, {useContext, useEffect, useState} from 'react'
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
import {useRouter} from "expo-router";
import {AuthContext} from "@/app/AuthProvider";

interface IChallenge {
  id: number;
  status: string;
  type: string;
  description: string;
}

interface IUserObject {
  id: number;
  username: string;
  email: string;
  picture: string;
  level: number;
  completedChallenges: IChallenge[];
  missedChallenges: IChallenge[];
  inProgressChallenges: IChallenge[];
}

export default function HomeScreen() {
  const { user } = useContext(AuthContext)!;
  const router = useRouter();
  const [userObject, setUserObject] = useState<IUserObject>({
    id: 0,
    username: '',
    email: '',
    picture: '',
    level: 0,
    completedChallenges: [],
    missedChallenges: [],
    inProgressChallenges: [],
  });
  const [selectedChallenge, setSelectedChallenge] = useState<IChallenge | null>(
      null
  )
  const [dailyChallenge, setDailyChallenge] = useState<IChallenge | null>(null);

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!user) {
      router.replace('http://localhost:8081/login'); // Adjust the route if needed
    }
  }, [user]);

  console.log(user);
  useEffect(() => {
    axios.get(` http://localhost:8080/users/username/${user}`).then((response) => {
      setUserObject(response.data);
      const dailyChallenges = response.data.inProgressChallenges.filter(
          (item) => item.type === 'daily'
      );
      if (dailyChallenges.length > 0) {
        const randomChallenge =
            dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
        setDailyChallenge(randomChallenge);
      } else {
        setDailyChallenge(null); // No daily challenges available
      }
      console.log(response.data)
    })
  }, []);
  useEffect(() => {
    axios.get(` http://localhost:8080/users/username/${user}`).then((response) => {
      setUserObject(response.data);
      console.log(response.data)
    })
  }, [selectedChallenge]);

  const [history, setHistory] = useState(true);
  const [daily, setDaily] = useState(false);
  const [weekly, setWeekly] = useState(false);

  const [modalVisible, setModalVisible] = useState(false)


  const handleCompleted = async () => {
    if (selectedChallenge) {
      try {
        // Send the POST request for completing the challenge
        await axios.post(
            `http://localhost:8080/users/id/${userObject.id}/challenges/${selectedChallenge.id}/complete`
        );
        console.log('Challenge marked as completed');
        // Optionally, handle state updates or UI changes here
      } catch (error) {
        console.error('Error completing challenge:', error);
        // You can show an error message to the user here
      }
    }
  };

  const handleMissed = async () => {
    if (selectedChallenge) {
      try {
        // Send the POST request for marking the challenge as missed
        await axios.post(
            `http://localhost:8080/users/id/${userObject.id}/challenges/${selectedChallenge.id}/miss`
        );
        console.log('Challenge marked as missed');
        // Optionally, handle state updates or UI changes here
      } catch (error) {
        console.error('Error marking challenge as missed:', error);
        // You can show an error message to the user here
      }
    }
  };

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
        <TouchableOpacity
        onPress={() => openModal(dailyChallenge)}
        >
        {dailyChallenge ? (
            <Text style={styles.cardBottomText}>{dailyChallenge.description}</Text>
        ) : (
            <Text style={styles.cardBottomText}>No daily challenges available!</Text>
        )}
        </TouchableOpacity>
      </View>


      <View style={styles.content}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              styles.button,
              history && styles.selectedButton,
            ]}
            onPress={() => {
              setHistory(true)
              setDaily(false)
              setWeekly(false)
            }}
          >
            <Text
              style={[
                styles.buttonText,
                history && styles.selectedButtonText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              daily && styles.selectedButton,
            ]}
            onPress={() => {
              setHistory(false)
              setDaily(true)
              setWeekly(false)
            }}
          >
            <Text
              style={[
                styles.buttonText,
                daily && styles.selectedButtonText,
              ]}
            >
              Daily
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              weekly && styles.selectedButton,
            ]}
            onPress={() => {
              setHistory(false)
              setDaily(false)
              setWeekly(true)
            }}
          >
            <Text
              style={[
                styles.buttonText,
                weekly && styles.selectedButtonText,
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
        </View>

        {/* List of Challenge Cards */}
        {history ? (
            <ScrollView style={styles.challengeList}>
              {userObject.completedChallenges?.length > 0 ? (
                  userObject.completedChallenges.map((item) =>
                      renderChallengeCard({ item })
                  )
              ) : (
                  <Text>No completed challenges found.</Text>
              )}
              {userObject.missedChallenges?.length > 0 ? (
                  userObject.missedChallenges.map((item) =>
                      renderChallengeCard({ item })
                  )
              ) : <Text>No missed challenges</Text>}
            </ScrollView>
        ) : null}
        {daily ? (
            <ScrollView style={styles.challengeList}>
              {userObject.inProgressChallenges.filter(challenge => challenge.type === 'daily').length > 0 ? (
                  userObject.inProgressChallenges
                      .filter(challenge => challenge.type === 'daily')
                      .map(item => renderChallengeCard({ item }))
              ) : (
                  <Text>No daily in-progress challenges found.</Text>
              )}
            </ScrollView>
        ) : null}

        {weekly ? (
            <ScrollView style={styles.challengeList}>
              {userObject.inProgressChallenges.filter(challenge => challenge.type === 'weekly').length > 0 ? (
                  userObject.inProgressChallenges
                      .filter(challenge => challenge.type === 'weekly')
                      .map(item => renderChallengeCard({ item }))
              ) : (
                  <Text>No weekly in-progress challenges found.</Text>
              )}
            </ScrollView>
        ) : null}

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
                  onPress={handleCompleted}
                >
                  <Text style={styles.completedButtonText}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.missedButton}
                  onPress={handleMissed}
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
    height: 200,
    position: 'absolute',
    top: 100,
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
