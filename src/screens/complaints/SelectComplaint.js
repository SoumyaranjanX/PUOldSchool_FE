import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/header/Header";
import BottomBar from "../../components/bottombar/BottomBar";

const SelectComplaint = () => {
  const navigation = useNavigation();
  const [showMessage, setShowMessage] = useState(false);
  const pulseAnimation = useState(new Animated.Value(1))[0];

  const handlePress = (serviceType) => {
    // Handle button press
    if (serviceType === "Electrical") {
      navigation.navigate("ElectricalComplaint");
    } else if (serviceType === "Civil") {
      // Display a message indicating the feature is coming soon
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000); // Display the message for 2 seconds
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(pulseAnimation, {
        toValue: 0.8,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnimation, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <>
      <Header />
      <Text style={styles.title}>Complaint Management System</Text>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            handlePress("Electrical");
            animateButton();
          }}
          style={[styles.button, { transform: [{ scale: pulseAnimation }] }]}
        >
          <Text style={styles.buttonText}>Electrical</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePress("Civil");
            animateButton();
          }}
          style={[styles.button, { transform: [{ scale: pulseAnimation }] }]}
        >
          <Text style={styles.buttonText}>Civil</Text>
        </TouchableOpacity>
      </View>
      {showMessage && (
        <View style={styles.animationContainer}>
          <Text style={styles.animationText}>
            Civil services are coming soon!
          </Text>
        </View>
      )}
      <BottomBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 20,
    marginLeft: 20,
    color: "#F08E0F",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F08E0F",
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  animationContainer: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  animationText: {
    color: "black",
    fontSize: 20,
  },
});

export default SelectComplaint;
