import React, { useState } from "react";
import {
  View,
  StatusBar,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignUp() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (
      !name ||
      !regNo ||
      !department ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const data = {
      name,
      regNo,
      department,
      email,
      password,
    };
    const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/users/register`;

    setLoading(true);
    axios
      .post(URL, data)
      .then((response) => {
        setLoading(false);
        if (response.data.statusCode === 200) {
          Alert.alert(response.data.message);
          navigation.navigate("SignIn");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.data);
          Alert.alert(error.response.data.message);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error:", error.message);
        }
      });
  };

  const logo = require("../../../assets/logo/logo_rc_transbg.png");

  return (
    <>
      <StatusBar backgroundColor={"#F08E0F"} />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 100,
        }}
      >
        <Image
          source={logo}
          style={{
            width: 190,
            height: 80,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: "#F08E0F",
            marginTop: 50,
          }}
        >
          Sign Up
        </Text>

        <TextInput
          style={{
            backgroundColor: "white",
            width: "85%",
            padding: 15,
            borderRadius: 15,
            marginTop: 20,
          }}
          placeholder="Full Name"
          value={name}
          onChangeText={(name) => setName(name)}
        />

        <TextInput
          style={{
            backgroundColor: "white",
            width: "85%",
            padding: 15,
            borderRadius: 15,
            marginTop: 20,
          }}
          placeholder="PU Registration Number"
          value={regNo}
          onChangeText={(regNo) => setRegNo(regNo)}
        />

        <TextInput
          style={{
            backgroundColor: "white",
            width: "85%",
            padding: 15,
            borderRadius: 15,
            marginTop: 20,
          }}
          placeholder="Department (Full Name)"
          value={department}
          onChangeText={(department) => setDepartment(department)}
        />

        <TextInput
          style={{
            backgroundColor: "white",
            width: "85%",
            padding: 15,
            borderRadius: 15,
            marginTop: 20,
          }}
          placeholder="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            width: "85%",
            padding: 15,
            borderRadius: 15,
            marginTop: 20,
          }}
        >
          <TextInput
            style={{
              flex: 1,
            }}
            placeholder="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon
              name={passwordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            width: "85%",
            padding: 15,
            borderRadius: 15,
            marginTop: 20,
          }}
        >
          <TextInput
            style={{
              flex: 1,
            }}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
            secureTextEntry={!confirmPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Icon
              name={confirmPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#F08E0F",
            width: "85%",
            padding: 15,
            borderRadius: 15,
            marginTop: 20,
            alignItems: "center",
          }}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white", fontSize: 16 }}>Sign Up</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={{ color: "#000", fontSize: 16, marginTop: 20 }}>
            Already Registered? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
