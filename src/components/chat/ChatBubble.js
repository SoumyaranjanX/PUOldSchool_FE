import { View, Text, Image, Animated, Easing } from "react-native"
import { useEffect } from "react";

export default function ChatBubble({ bgColor, pColor, message, messageType, messageTime }) {
    const userImage = require('../../../assets/user.webp')
    // Parse messageTime into a Date object
    const messageDate = new Date(messageTime);

    // Get the current date
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDiff = currentDate - messageDate;
    const timeDiffInMinutes = Math.floor(timeDiff / (1000 * 60));

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

    // Function to determine relative time
    const getRelativeTime = (timeDiffInMinutes) => {
        if (timeDiffInMinutes <= 5) {
            return "Just now";
        } else if (timeDiffInMinutes <= 1440 && messageDate.getDate() === currentDate.getDate()) {
            return "Today";
        } else if (timeDiffInMinutes <= 2880 && messageDate.getDate() === currentDate.getDate() + 1) {
            return "Tomorrow";
        } else {
            return formatDate(messageDate);
        }
    };

    // Determine the relative time
    const relativeTime = getRelativeTime(timeDiffInMinutes);

    // Combine relative time and formatted time
    const formattedTime = `${relativeTime}, ${formatTime(messageDate)}`;

    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, []);

    


    return (
        <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
            <View style={{ width: 70 }}>
                <View style={{ width: 45, height: 45, backgroundColor: 'blue', borderRadius: 50, overflow: 'hidden' }}>
                    <Image
                        source={userImage}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <View style={{ paddingRight: 15, paddingTop: 3, paddingBottom: 3, borderRadius: 20 }}>
                            <Text style={{ color: pColor, fontSize: 12,  backgroundColor: bgColor, paddingLeft:10, paddingRight:10, paddingTop:2, paddingBottom:2, borderRadius:8 }}>{messageType}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 11, color: 'gray' }}>
                            {formattedTime}
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: 5 }}>
                    <View style={{
                        padding: 15,
                        borderTopRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        borderWidth: 1,
                        borderColor: bgColor,
                        backgroundColor: '#FFF',
                        shadowColor: pColor,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        elevation: 5,
                    }}>
                        <Text style={{ textAlign: 'justify' }}>{message}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
