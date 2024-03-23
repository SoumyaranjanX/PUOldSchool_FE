import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Feather } from 'react-native-vector-icons';

const SliderDetails = ({ event, closeModal }) => {
    const {
        eventName,
        category,
        location,
        eventDetails,
        fromDate,
        fromTime,
        toDate,
        toTime,
        imageUrl,
    } = event;

    const formatDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return formattedDate;
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ width: Dimensions.get('window').width * 0.9, maxHeight: Dimensions.get('window').height * 0.8, backgroundColor: 'white', borderRadius: 15, paddingTop: 40, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, overflow: 'hidden' }}>
                <TouchableOpacity onPress={closeModal} style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    <Feather name="x" size={25} color="#666666" />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Image source={{ uri: imageUrl }} style={{ width: '100%', aspectRatio: 2 / 1, borderRadius: 10 }} resizeMode="cover" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{eventName}</Text>
                        <Text style={{ fontSize: 18, color: '#666666', marginBottom: 20 }}>{category}</Text>
                        <View style={{ marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={{ flex: 1, fontWeight: 'bold', marginRight: 10 }}>Location:</Text>
                                <Text style={{ flex: 2 }}>{location}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={{ flex: 1, fontWeight: 'bold', marginRight: 10 }}>From:</Text>
                                <Text style={{ flex: 2 }}>{`${formatDate(fromDate)} ${fromTime}`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={{ flex: 1, fontWeight: 'bold', marginRight: 10 }}>To:</Text>
                                <Text style={{ flex: 2 }}>{`${formatDate(toDate)} ${toTime}`}</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 16, lineHeight: 24, textAlign:'justify' }}>{eventDetails}</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default SliderDetails;
