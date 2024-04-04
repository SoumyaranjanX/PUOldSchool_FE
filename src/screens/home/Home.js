import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import Header from "../../components/header/Header";
import AnnouncementDetails from "../../components/announcment/AnnouncementDetails";
import QuickLink from "../../components/quicklink/QuickLink";
import Chat from "../../components/chat/Chat";
import ChatType from "../../components/chat/ChatType";
import BottomBar from "../../components/bottombar/BottomBar";
import axios from "axios";

export default function Home() {
  const [latestNotice, setLatestNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl = `${process.env.EXPO_PUBLIC_API_HOST}/api/notice/getnotice`;

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      // console.log("API response:", response.data);
      if (response.data.success) {
        const noticedata = response.data.data;
        // console.log('Original notice data:', noticedata);
        if (noticedata && noticedata.length > 0) {
          noticedata.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          // console.log('Sorted notice data:', noticedata);
          const latest = noticedata[0];
          // console.log('Latest notice:', latest);
          setLatestNotice(latest);
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
          <ScrollView>
            {isLoading ? (
              <ActivityIndicator size="large" color="#F08E0F" />
            ) : error ? (
              <Text>{error}</Text>
            ) : latestNotice ? (
              <AnnouncementDetails
                title={latestNotice.title}
                date={formatDate(latestNotice.createdAt)}
                content={latestNotice.shortDec}
                image={latestNotice.noticeImage}
                page="home"
              />
            ) : (
              <Text>No notices found.</Text>
            )}
            <QuickLink />
            <Chat />
            <ChatType />
          </ScrollView>
        </View>
        <BottomBar />
      </View>
    </>
  );
}
