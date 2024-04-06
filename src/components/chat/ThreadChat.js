import React, { useEffect, useState, useRef } from "react";
import { View, ScrollView, Dimensions, ActivityIndicator, Text } from "react-native";
import { io } from "socket.io-client";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThreadChatBubble from "./ThreadChatBubble";

const socket = io(process.env.EXPO_PUBLIC_API_HOST);

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

export default function ThreadChat({ threadId }) {
    const [messagesData, setMessagesData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const scrollViewRef = useRef();

    useEffect(() => {
        fetchThreadMessages(pageNumber)
    }, []);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessagesData(prevMessages => [...prevMessages, data]);
            console.log(data)
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);

    const fetchThreadMessages = async (page) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
    
            console.log("access token: ", threadId)
    
            if (accessToken) {
                const fetchThreadMessagesURL = `${process.env.EXPO_PUBLIC_API_HOST}/api/chat/fetchThreadMessages`;
                axios.get(fetchThreadMessagesURL, {
                    params: { threadId: threadId, pageNumber: page },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                .then(response => {
                    const fetchedMessages = response.data.data.messages;
                    setMessagesData(prevMessages => [...prevMessages, ...fetchedMessages.reverse()]);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error.response.data);
                    setLoading(false);
                });
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const atTop = contentOffset.y === 0;
        if (atTop && !loading) {
            setLoading(true);
            setPageNumber(prevPage => prevPage + 1);
            fetchMessages(pageNumber + 1);
        }
    };

    const scrollToBottom = () => {
        console.log("scrolling down")
        scrollViewRef.current.scrollToEnd({ animated: false });
    };

    return (
        <View style={{ paddingTop: 5, width: '93%', marginLeft: 'auto', marginRight: 'auto', flex: 1 }}>
            <ScrollView
                ref={scrollViewRef}
                nestedScrollEnabled={true}
                style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    shadowColor: '#F08E0F',
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 5,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    borderColor: '#F08E0F',
                    borderWidth: 1,
                    height: 620,
                }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                onContentSizeChange={() => { pageNumber == 1 ? scrollToBottom() : '' }}
            >

                {loading ? (
                    <ActivityIndicator size="large" color="#F08E0F" style={{ marginTop: 20 }} />
                ) : (
                    messagesData.map((data, index) => (
                        <ThreadChatBubble key={index}
                            messageId={data._id}
                            bgColor={data.selectedBGColor}
                            pColor={data.selectedPColor}
                            message={data.message}
                            messageType={data.selectedType}
                            messageTime={data.time}
                            imageUrl={data.imageUrl}
                        />
                    ))
                )}

            </ScrollView>
        </View>
    );
}
