import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar, Alert, Image, Modal } from "react-native";
import Header from "../../components/header/Header";
import BottomBar from "../../components/bottombar/BottomBar";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function RequestEvent() {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [promotionBanner, setPromotionBanner] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const eventTypes = ["Sport Events", "Cultural Events", "Social Events"];

    const handleEventTypeSelect = (type) => {
        setEventType(type);
        setModalVisible(false);
    };

    const handleStartDateChange = (event, selected) => {
        if (selected) {
            setStartDate(selected);
        }
        setShowStartDatePicker(false);
    };

    const handleStartTimeChange = (event, selected) => {
        if (selected) {
            setStartTime(selected);
        }
        setShowStartTimePicker(false);
    };

    const handleEndDateChange = (event, selected) => {
        if (selected) {
            setEndDate(selected);
        }
        setShowEndDatePicker(false);
    };

    const handleEndTimeChange = (event, selected) => {
        if (selected) {
            setEndTime(selected);
        }
        setShowEndTimePicker(false);
    };

    const handleBannerUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
            if (!result.canceled) {
                console.log(result.assets[0].uri)
                setPromotionBanner(result.assets[0]);
            }
        } catch (error) {
            console.log("Error uploading banner:", error);
        }
    };


    const handleSubmit = async () => {
        if (!eventTitle.trim()) {
            Alert.alert('Title is required');
            return;
        }
        if (endDate < startDate) {
            Alert.alert('End date should be after start date');
            return;
        }

        if (!promotionBanner.uri) {
            Alert.alert('Promotion banner is required');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('eventName', eventTitle);
            formData.append('category', eventType);
            formData.append('location', eventLocation);
            formData.append('eventDetails', eventDetails);
            formData.append('fromDate', startDate.toDateString());
            formData.append('fromTime', startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            formData.append('toDate', endDate.toDateString());
            formData.append('toTime', endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            formData.append('image', {
                uri: promotionBanner.uri,
                type: promotionBanner.mimeType,
                name: promotionBanner.name,
            });

            const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/event/createEvent`

            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    axios.post(URL, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${accessToken}`
                        },
                    })
                        .then(response => {
                            if (response.data.statusCode == 200) {
                                setEventTitle('');
                                setEventType('');
                                setEventLocation('');
                                setPromotionBanner(null);
                                Alert.alert(response.data.message);
                            }
                        })
                        .catch(error => {
                            console.log(error.message)
                        })

                }
            } catch (error) {
                console.log('Error Uploading Event:', error);
            }

        } catch (error) {
            console.log("Error submitting event:", error);
            // Handle error
        }
    };

    return (
        <>
            <StatusBar backgroundColor={'#0f9d58'} />
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header />
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 10, paddingHorizontal: 10 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f9d58', marginVertical: 10, paddingVertical: 15, borderRadius: 8, elevation: 4, shadowColor: 'gray', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4 }}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Request to Promote an Event</Text>
                    </TouchableOpacity>
                    <View style={{ padding: 15, marginVertical: 10, backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#F08E0F', shadowColor: 'gray', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 2 }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16 }}>Event Title:</Text>
                            <TextInput
                                style={{ backgroundColor: '#f3f3f3', padding: 10, borderRadius: 10 }}
                                multiline={true}
                                placeholder="Enter event title"
                                placeholderTextColor="#ccc"
                                value={eventTitle}
                                onChangeText={text => setEventTitle(text)}
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16 }}>Event Type:</Text>
                            <TouchableOpacity
                                style={{ backgroundColor: '#f3f3f3', padding: 15, borderRadius: 10 }}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text>{eventType || 'Select event type'}</Text>
                            </TouchableOpacity>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <View style={{ backgroundColor: '#fff', padding: 30, borderRadius: 10 }}>
                                        {eventTypes.map((type, index) => (
                                            <TouchableOpacity key={index} onPress={() => handleEventTypeSelect(type)} style={{ backgroundColor: 'gray', padding: 10, margin: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                                <Text style={{ paddingVertical: 10, paddingHorizontal: 25, color: '#fff', fontWeight: 'bold' }}>{type}</Text>
                                            </TouchableOpacity>
                                        ))}
                                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: 'red', padding: 10, margin: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                            <Text style={{ paddingVertical: 3, color: '#fff' }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16 }}>Event Location:</Text>
                            <TextInput
                                style={{ backgroundColor: '#f3f3f3', padding: 10, borderRadius: 10 }}
                                placeholder="Enter event location"
                                placeholderTextColor="#ccc"
                                value={eventLocation}
                                onChangeText={text => setEventLocation(text)}
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: 16 }}>From:</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <TextInput
                                        style={{ backgroundColor: '#f3f3f3', padding: 10, borderRadius: 10 }}
                                        placeholder="Start Date"
                                        placeholderTextColor="#ccc"
                                        onFocus={() => setShowStartDatePicker(true)}
                                        value={startDate.toDateString()} // Display selected date
                                        editable={!showStartDatePicker} // Disable text input when date picker is open
                                    />
                                    {showStartDatePicker && (
                                        <DateTimePicker
                                            value={startDate}
                                            mode="date"
                                            display="default"
                                            onChange={handleStartDateChange}
                                        />
                                    )}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        style={{ backgroundColor: '#f3f3f3', padding: 10, borderRadius: 10 }}
                                        placeholder="Start Time"
                                        placeholderTextColor="#ccc"
                                        onFocus={() => setShowStartTimePicker(true)}
                                        value={startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} // Display selected time
                                        editable={!showStartTimePicker} // Disable text input when time picker is open
                                    />
                                    {showStartTimePicker && (
                                        <DateTimePicker
                                            value={startTime}
                                            mode="time"
                                            display="default"
                                            onChange={handleStartTimeChange}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16 }}>To:</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        style={{ backgroundColor: '#f3f3f3', padding: 10, borderRadius: 10 }}
                                        placeholder="End Date"
                                        placeholderTextColor="#ccc"
                                        onFocus={() => setShowEndDatePicker(true)}
                                        value={endDate.toDateString()} // Display selected date
                                        editable={!showEndDatePicker} // Disable text input when date picker is open
                                    />
                                    {showEndDatePicker && (
                                        <DateTimePicker
                                            value={endDate}
                                            mode="date"
                                            display="default"
                                            onChange={handleEndDateChange}
                                        />
                                    )}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        style={{ backgroundColor: '#f3f3f3', padding: 10, borderRadius: 10 }}
                                        placeholder="End Time"
                                        placeholderTextColor="#ccc"
                                        onFocus={() => setShowEndTimePicker(true)}
                                        value={endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} // Display selected time
                                        ditable={!showEndTimePicker} // Disable text input when time picker is open
                                    />
                                    {showEndTimePicker && (
                                        <DateTimePicker
                                            value={endTime}
                                            mode="time"
                                            display="default"
                                            onChange={handleEndTimeChange}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16 }}>Event Details:</Text>
                            <TextInput
                                style={{ backgroundColor: '#f3f3f3', padding: 10, borderRadius: 10, textAlignVertical: 'top' }}
                                multiline={true}
                                numberOfLines={4}
                                placeholder="Enter event details"
                                placeholderTextColor="#ccc"
                                value={eventDetails}
                                onChangeText={text => setEventDetails(text)} // Update event details state
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16 }}>Promotion Banner: (size: 1000px*500px)</Text>
                            {promotionBanner ? (
                                <View style={{ borderWidth: 1, borderColor: '#ccc' }}>
                                    <Image source={{ uri: promotionBanner.uri }} style={{ width: '100%', aspectRatio: 2 / 1, borderRadius: 10, marginBottom: 10 }} />
                                    <TouchableOpacity
                                        style={{ position: 'absolute', top: 10, right: 10 }}
                                        onPress={() => setPromotionBanner(null)}
                                    >
                                        <Feather name="x-circle" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={{ backgroundColor: '#f3f3f3', padding: 10, borderRadius: 10 }}
                                    onPress={handleBannerUpload}
                                >
                                    <Text>Upload Banner</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{ backgroundColor: '#0f9d58', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 8, elevation: 4, shadowColor: 'gray', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4 }}
                                onPress={handleSubmit}
                            >
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <BottomBar />
            </View>
        </>
    )
}
