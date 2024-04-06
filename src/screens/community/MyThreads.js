import { useState, useEffect } from "react";
import Header from "../../components/header/Header"
import BottomBar from "../../components/bottombar/BottomBar"
import { Text, View, ScrollView, Animated, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { Feather } from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function MyThreads() {

    const navigation = useNavigation();
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchThreads();
    }, []);

    const fetchThreads = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');

            if (accessToken) {
                const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/chat/getMyThreads`;

                axios.get(URL, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                .then(response => {
                    const fetchedThreads = response.data.data.threads;
                    setThreads(fetchedThreads.map(thread => ({
                        ...thread,
                        formattedTime: formatMessageTime(thread.message.messageTime),
                    })));
                    setLoading(false); // Set loading to false when threads are fetched
                })
                .catch(error => {
                    console.log('Error fetching threads:', error);
                    Alert.alert("Something went wrong")
                    setLoading(false); // Set loading to false in case of error
                });
            }
        } catch (error) {
            console.error('Error fetching threads:', error);
            setLoading(false); // Set loading to false in case of error
        }
    };

    const deleteThread = async (threadId) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');

            if (accessToken) {
                const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/chat/deleteThreadAndMessages`;

                setLoading(true); // Set loading to true while deleting

                axios.delete(URL, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: { threadId } // Pass threadId in the request body
                })
                .then(response => {
                    // Refresh threads after successful deletion
                    fetchThreads();
                })
                .catch(error => {
                    console.log('Error deleting thread:', error);
                    Alert.alert("Something went wrong while deleting thread")
                    setLoading(false); // Set loading to false in case of error
                });
            }
        } catch (error) {
            console.error('Error deleting thread:', error);
            Alert.alert("Something went wrong while deleting thread")
            setLoading(false); // Set loading to false in case of error
        }
    };
    // Function to format message time
    const formatMessageTime = (messageTime) => {
        const messageDate = new Date(messageTime);
        const currentDate = new Date();
        const timeDiff = currentDate - messageDate;
        const timeDiffInMinutes = Math.floor(timeDiff / (1000 * 60));

        if (timeDiffInMinutes <= 5) {
            return "Just now";
        } else if (timeDiffInMinutes <= 1440 && messageDate.getDate() === currentDate.getDate()) {
            return "Today, " + formatTime(messageDate);
        } else if (timeDiffInMinutes <= 2880 && messageDate.getDate() === currentDate.getDate() + 1) {
            return "Tomorrow, " + formatTime(messageDate);
        } else {
            return formatDate(messageDate) + ", " + formatTime(messageDate);
        }
    };

    // Function to format time in HH:MM AM/PM format
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    // Function to format date in DD-MM-YY format
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = String(date.getFullYear()).slice(-2);
        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <Header />
            <View style={{ flex: 1, paddingTop: 5, paddingBottom: 15 }}>
                <ScrollView>
                    {loading ? ( // Render loading indicator if loading is true
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : (
                        threads.length > 0 ? (
                            threads.map((thread) => (
                                <TouchableOpacity
                                    key={thread._id}
                                    style={{
                                        marginTop: 10,
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                    }}
                                    onPress={() => navigation.navigate('SingleThread', { threadId: thread._id })}
                                >
                                    {/* Render thread information */}
                                    <View
                                        style={{
                                            width: '93%',
                                            padding: 10,
                                            shadowColor: '#464646',
                                            shadowOffset: {
                                                width: 0,
                                                height: 3,
                                            },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 3,
                                            elevation: 3,
                                            backgroundColor: '#fff',
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Animated.View style={[{ flexDirection: 'row', marginBottom: 0, marginTop: 0 }]}>
                                            {/* Render thread sender's profile image */}
                                            <View style={{ width: 70 }}>
                                                <View
                                                    style={{
                                                        width: 45,
                                                        height: 45,
                                                        backgroundColor: 'blue',
                                                        borderRadius: 50,
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <Image
                                                        source={{ uri: thread.message.sender.imageUrl }}
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </View>
                                            </View>
                                            {/* Render thread information */}
                                            <View style={{ flex: 1 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                                        <View
                                                            style={{
                                                                paddingRight: 15,
                                                                paddingTop: 3,
                                                                paddingBottom: 3,
                                                                borderRadius: 20,
                                                            }}
                                                        >
                                                            {/* Render message type */}
                                                            <Text
                                                                style={{
                                                                    color: '#fff',
                                                                    fontSize: 12,
                                                                    backgroundColor: 'red',
                                                                    paddingLeft: 10,
                                                                    paddingRight: 10,
                                                                    paddingTop: 2,
                                                                    paddingBottom: 2,
                                                                    borderRadius: 8,
                                                                }}
                                                            >
                                                                {thread.message.messageType}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    {/* Render formatted time */}
                                                    <View style={{ alignItems: 'flex-end' }}>
                                                        <Text style={{ fontSize: 11, color: 'gray' }}>{thread.formattedTime}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: 5 }}>
                                                    <View
                                                        style={{
                                                            padding: 15,
                                                            borderTopRightRadius: 20,
                                                            borderBottomLeftRadius: 20,
                                                            borderBottomRightRadius: 20,
                                                            borderWidth: 1,
                                                            borderColor: 'red',
                                                            backgroundColor: '#FFF',
                                                            shadowColor: 'red',
                                                            shadowOffset: {
                                                                width: 0,
                                                                height: 3,
                                                            },
                                                            shadowOpacity: 0.3,
                                                            shadowRadius: 5,
                                                            elevation: 5,
                                                        }}
                                                    >
                                                        {/* Render message */}
                                                        <Text style={{ textAlign: 'justify' }}>{thread.message.message}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </Animated.View>

                                        {/* Render last message */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: 10 }}>
                                            <Feather name="corner-up-left" size={25} color="#666666" />
                                            <Text style={{ marginLeft: 20, color:'gray' }}>{thread.lastMessage?.message}</Text>
                                        </View>

                                        {/* Render delete button */}
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginLeft: 15,
                                                marginTop: 10,
                                                backgroundColor: '#E23F44',
                                                padding: 7,
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                            }}
                                            onPress={() => deleteThread(thread._id)}
                                        >
                                            <Feather name="trash-2" size={25} color="#fff" />
                                            <Text style={{ marginLeft: 10, color: '#fff', fontWeight: 'bold' }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>You Have No Active Thread</Text>
                                <Text style={{fontWeight:'bold'}}>Longpress a community chat to create a thread</Text>
                            </View>
                        )

                    )}
                </ScrollView>
            </View>
            <BottomBar />

        </>
    )
}
