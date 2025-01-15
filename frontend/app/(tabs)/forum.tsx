import React, { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    ScrollView,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '@/app/AuthProvider';
import {setSelectedLog} from "@expo/metro-runtime/build/error-overlay/Data/LogBoxData";

interface IPost {
    id: number;
    username: string;
    postDescription: string;
}

export default function ForumScreen() {
    const { user } = useContext(AuthContext)!;
    const [posts, setPosts] = useState<IPost[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPostDescription, setNewPostDescription] = useState('');
    const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/posts`).then((response) => {
            setPosts(response.data);
        });
    }, []);

    const handleAddPost = () => {
        const newPost = {
            id: posts.length + 1, // Temporary ID until the backend generates one
            username: user,
            postDescription: newPostDescription,
        };

        axios.post(`http://localhost:8080/posts`, newPost).then((response) => {
            // Add the new post to the top of the list
            setPosts([response.data, ...posts]);
            setModalVisible(false);
            setNewPostDescription('');
        });
    };

    const openPostModal = (post: IPost) => {
        setSelectedPost(post); // Set the selected post
        setModalVisible(true); // Open the modal
    };

    const openAddPostModal = () => {
        setSelectedPost(null); // Clear the selected post
        setModalVisible(true); // Open the modal
    };

    const renderPostCard = ({ item }: { item: IPost }) => (
        <TouchableOpacity style={styles.card} onPress={() => openPostModal(item)} key={item.id}>
            <View style={styles.cardContent}>
                <Text style={styles.status}>{item.username}</Text>
                <Text style={styles.description}>{item.postDescription}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.blueContainer}></View>

            <View style={styles.cardDaily}>
                <Text style={styles.cardTopText}>Success stories</Text>
                <Text style={styles.cardBottomText}>Share your own story too!</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* Render posts in reverse order */}
                {posts.slice().reverse().map((post) => (
                    <View key={post.id}>{renderPostCard({ item: post })}</View>
                ))}
            </ScrollView>

            <View>
                <TouchableOpacity style={styles.addButton} onPress={openAddPostModal}>
                    <Text style={styles.addButtonText}>+ Add Post</Text>
                </TouchableOpacity>
            </View>

            {/* Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeIconContainer}
                            onPress={() => setModalVisible(false)}
                        >
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                        {selectedPost ? (
                            <>
                                <Text style={styles.modalTitle}>Post Details</Text>
                                <Text style={styles.status}>User: {selectedPost.username}</Text>
                                <Text style={styles.description}>{selectedPost.postDescription}</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.modalTitle}>Add a New Post</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Write your post description..."
                                    value={newPostDescription}
                                    onChangeText={setNewPostDescription}
                                />
                                <TouchableOpacity style={styles.completedButton} onPress={handleAddPost}>
                                    <Text style={styles.completedButtonText}>Post</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
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
        padding: 3,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },
    status: {
        fontSize: 14,
        color: '#999',
        top: 5,
        padding: 3,
    },
    addButton: {
        backgroundColor: '#F7A348',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
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
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    completedButton: {
        backgroundColor: '#F7A348',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    completedButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
