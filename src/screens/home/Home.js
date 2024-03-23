import { ScrollView, StatusBar, View } from "react-native"
import Header from "../../components/header/Header"
import Slider from "../../components/hero/Slider"
import AnnouncementDetails from "../../components/announcment/AnnouncementDetails"
import QuickLink from "../../components/quicklink/QuickLink"
import Chat from "../../components/chat/Chat"
import ChatType from "../../components/chat/ChatType"
import BottomBar from "../../components/bottombar/BottomBar"

export default function Home() {
  var image = require('../../../assets/announcements/notice.jpeg');
  return (
    <>
      <StatusBar backgroundColor={'#F08E0F'} />
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flex:1, paddingBottom: 10 }}>
          <ScrollView >
            <Slider />
            <AnnouncementDetails
              title='Notice'
              date='12th Jan 2024 - 12:24:25 AM'
              content='University Will Be Closed from 20th Jan to 25th Jan, Because of Holy.'
              page='home'
              image={image}
            />
            <QuickLink />
            <Chat />
            <ChatType />
          </ScrollView>
        </View>
        <BottomBar />
      </View>
    </>

  )
}
