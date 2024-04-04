import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { Feather } from "react-native-vector-icons";
import PDFViewer from "./PDFViewer";

const AnnouncementDetails = ({
  title,
  date,
  content,
  image,
  page = "other",
}) => {
  // console.log(image)
  const navigation = useNavigation();
  const greenTick = require("../../../assets/green_tick.gif");
  const [modalVisible, setModalVisible] = useState(false);

  console.log(image);

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <View
          style={{
            width: "93%",
            padding: 10,
            shadowColor: "#464646",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 3, // For Android
            backgroundColor: "#fff", // Set background color to your preference
            borderRadius: 10, // Set border radius to your preference
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{ flex: 0.75, flexDirection: "row", alignItems: "center" }}
            >
              <Image source={greenTick} style={{ width: 20, height: 20 }} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#F08E0F",
                }}
              >
                {title}
              </Text>
            </View>
            {page == "home" ? (
              <View
                style={{
                  flex: 0.25,
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "#EAFDFE",
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Announcement")}
                >
                  <Text style={{ color: "#00D699", fontWeight: 600 }}>
                    {" "}
                    View All{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              ""
            )}
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <View
              style={{ flex: 0.75, flexDirection: "row", alignItems: "center" }}
            >
              <Feather name="calendar" size={16} color="#666666" />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 11,
                  fontWeight: "400",
                  color: "#000",
                  paddingLeft: 3,
                }}
              >
                {date}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color: "#000",
                  paddingLeft: 30,
                  paddingRight: 5,
                  width: "100%",
                  textAlign: "justify",
                }}
              >
                {content}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Control Panel */}
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 15,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity onPress={() => {}} style={{ marginRight: 20 }}>
                <Feather name="share-2" size={21} color="#666666" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={25} color="#666666" />
              </TouchableOpacity>
            </View>
            <PDFViewer image={image} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AnnouncementDetails;
