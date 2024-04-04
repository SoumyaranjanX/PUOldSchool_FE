import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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

  const handleImagePress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="All Events" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#F08E0F" />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          events.map((event, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImagePress(event)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: event.imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <LinearGradient // Overlaying the text with a gradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={styles.gradient}
                >
                  <Text style={styles.eventName}>{event.eventName}</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: 15,
  },
  imageContainer: {
    width: 470,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#F08E0F",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  eventName: {
    color: "#F08E0F",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AllEvents;
