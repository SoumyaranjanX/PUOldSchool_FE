import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Header from "../../components/header/Header";
import BottomBar from "../../components/bottombar/BottomBar";
import AnnouncementDetails from "../../components/announcment/AnnouncementDetails";

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl = `${process.env.EXPO_PUBLIC_API_HOST}/api/notice/getnotice`;

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      console.log("API response:", response.data); // Log the API response
      if (response.data.success) {
        const noticedata = response.data.data;
        console.log("Original notice data:", noticedata); // Log the original notice data
        if (noticedata && noticedata.length > 0) {
          // Sort the notices by updatedAt field in descending order
          noticedata.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          console.log("Sorted notice data:", noticedata); // Log the sorted notice data
          // Set the sorted notices in the state
          setAnnouncements(noticedata);
        } else {
          console.log("No notices found.");
        }
      } else {
        setError(response.data.message || "Error fetching data.");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
      setIsLoading(false);
    }
  };
  // Function to format the date string
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <StatusBar backgroundColor={"#F08E0F"} />
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flex: 1, paddingBottom: 10 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#F08E0F" />
          ) : error ? (
            <Text>{error}</Text>
          ) : announcements.length > 0 ? (
            <ScrollView>
              {announcements.map((announcement) => (
                <AnnouncementDetails
                  key={announcement._id} // Use _id as the key
                  title={announcement.title}
                  date={formatDate(announcement.createdAt)} // Format the date
                  content={announcement.shortDec} // Using shortDec as content
                  image={announcement.noticeImage} // Using noticeImage for image
                />
              ))}
            </ScrollView>
          ) : (
            <Text>No announcements found.</Text>
          )}
        </View>
        <BottomBar />
      </View>
    </>
  );
}
