import React, { useState, useEffect, useRef } from 'react';
import { View, Image, ScrollView, Dimensions, TouchableOpacity, Modal, Text } from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SliderDetails from './SliderDetails'; // Import the SliderDetails component

const Slider = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const scrollViewRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // State to hold the selected event
    const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/event/getEvents`;
                    axios.get(URL, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    })
                        .then(response => {
                            setEvents(response.data.data);
                            console.log(events)
                        })
                        .catch(error => {
                            console.log(error.response.data);
                        });
                } else {
                    console.log("Access token not found");
                }
            } catch (error) {
                console.log('Error checking authentication status:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextPage = (currentPage + 1) % events.length;
            scrollViewRef.current.scrollTo({
                animated: true,
                x: Dimensions.get('window').width * nextPage,
            });
            setCurrentPage(nextPage);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentPage, events]);

    const handlePageChange = (event) => {
        const { contentOffset } = event.nativeEvent;
        const page = Math.round(contentOffset.x / Dimensions.get('window').width);
        setCurrentPage(page);
    };

    const handleImagePress = (index) => {
        setSelectedEvent(events[index]);
        setModalVisible(true);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handlePageChange}
            >
                {events ? (
                    events.map((event, index) => (
                        <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
                            <Image
                                source={{ uri: event.imageUrl }}
                                style={{
                                    width: Dimensions.get('window').width,
                                    height: Dimensions.get('window').width * 0.5,
                                }}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>No events to display</Text>
                )}

            </ScrollView>

            {/* Modal for displaying details */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SliderDetails event={selectedEvent} closeModal={() => setModalVisible(false)} />
            </Modal>
        </View>
    );
};

export default Slider;
