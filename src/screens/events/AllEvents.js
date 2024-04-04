import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import axios from "axios";
import Header from "../../components/header/Header";
import BottomBar from "../../components/bottombar/BottomBar";
import SliderDetails from "../../components/hero/SliderDetails";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = (index) => {
    setSelectedEvent(events[index]);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_HOST}/api/event/getEvents`
      );
      if (response.data.success) {
        setEvents(response.data.data);
      } else {
        setError(response.data.message || "Error fetching data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="All Events" />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#F08E0F" />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <ScrollView>
            {events.map((event, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index)}
              >
                <Image
                  source={{ uri: event.imageUrl }}
                  style={{
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").width * 0.5,
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      <BottomBar />
      {/* Modal for displaying details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SliderDetails
          event={selectedEvent}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default AllEvents;
