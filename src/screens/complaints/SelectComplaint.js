import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/header/Header";
import BottomBar from "../../components/bottombar/BottomBar";

const SelectComplaint = () => {
  const navigation = useNavigation();
  const [showMessage, setShowMessage] = useState(false);
  const pulseAnimation = useState(new Animated.Value(1))[0];

  const handlePress = (serviceType) => {
    if (serviceType === "Electrical") {
      navigation.navigate("ElectricalComplaint");
    } else if (serviceType === "Civil") {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
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
          <Image
            source={require("../../../assets/electrical_background.png")}
            style={styles.imageContainer}
            resizeMode="cover"
          />
          <Text style={styles.buttonText}>Electrical</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePress("Civil");
            animateButton();
          }}
          style={[styles.button, { transform: [{ scale: pulseAnimation }] }]}
        >
          <Image
            source={require("../../../assets/civil_background.png")}
            style={styles.imageContainer}
            resizeMode="cover"
          />
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
    width: 190,
    height: 220,
    marginBottom: 50,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 150,
    height: 150,
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  buttonText: {
    position: "absolute",
    bottom: 5,
    color: "#F08E0F",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
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
