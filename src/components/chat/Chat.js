import React, { useEffect, useState, useRef } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import ChatBubble from "./ChatBubble";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io(process.env.EXPO_PUBLIC_API_HOST);

export default function Chat({ community = false }) {
    const [messagesData, setMessagesData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const scrollViewRef = useRef();

    const buddy = require('../../../assets/buddy.png')
    const info = require('../../../assets/info.png')
    const lostfound = require('../../../assets/lostfound.webp')
    const ecom = require('../../../assets/ecom.png')

    useEffect(() => {
        fetchMessages(pageNumber)
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

    const fetchMessages = (page) => {
        const getMessagesURL = `${process.env.EXPO_PUBLIC_API_HOST}/api/chat/fetchMessages`;
        axios.get(getMessagesURL, { params: { pageNumber: page } })
            .then(response => {
                if(response.data == ''){
                    setPageNumber(prevPage => prevPage - 1);
                    setLoading(false);
                    return;
                }
                const formattedMessages = response.data.map(message => {
                    let selectedImage, selectedBGColor, selectedPColor;
                    let selectedType = message.messageType;
                    switch (message.messageType) {
                        case 'Hey Buddy':
                            selectedImage = buddy;
                            selectedBGColor = '#C8EEFF';
                            selectedPColor = '#4285F4';
                            break;
                        case 'Lost & Found':
                            selectedImage = lostfound;
                            selectedBGColor = '#d844375e';
                            selectedPColor = '#d84437';
                            break;
                        case 'Information':
                            selectedImage = info;
                            selectedBGColor = '#f08e0f63';
                            selectedPColor = '#f08e0f';
                            break;
                        case 'Requirement & Fulfilment':
                            selectedImage = ecom;
                            selectedBGColor = '#0f9d5861';
                            selectedPColor = '#0f9d58';
                            break;
                        default:
                            selectedImage = null;
                            selectedBGColor = '#FFFFFF';
                            selectedPColor = '#000000';
                    }
                    return {
                        ...message,
                        selectedImage,
                        selectedBGColor,
                        selectedPColor,
                        selectedType
                    };
                });

                setMessagesData(prevMessages => [...formattedMessages.reverse(),...prevMessages]);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
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
                    height: community ? 620 : 180,
                }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                onContentSizeChange={() => {pageNumber==1?scrollToBottom():''}}
            >

                {messagesData.map((data, index) => (
                    <ChatBubble key={index}
                        bgColor={data.selectedBGColor}
                        pColor={data.selectedPColor}
                        message={data.message}
                        messageType={data.selectedType}
                        messageTime={data.messageTime} 
                        imageUrl={data.imageUrl}
                        />
                ))}

            </ScrollView>
        </View>
    );
}
