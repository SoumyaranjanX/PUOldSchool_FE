import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/users/getUser`;
          axios.get(URL, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => {
            setProfileImage(response.data.data.imageUrl)
          })
          .catch(error => {
            console.log(error.response.data);
          });
        } else {
          console.log("something went wrong")
        }
      } catch (error) {
        console.log('Error checking authentication status:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image source={require("../../../assets/logo/logo_rc_transbg.png")} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profileContainer}>
        <Image source={{uri: profileImage}} style={styles.profileImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  profileContainer: {
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});

export default Header;
