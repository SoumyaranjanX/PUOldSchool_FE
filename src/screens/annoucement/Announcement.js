import React from 'react'
import { View, Text, StatusBar, ScrollView } from 'react-native'
import Header from '../../components/header/Header'
import BottomBar from '../../components/bottombar/BottomBar'
import AnnouncementDetails from '../../components/announcment/AnnouncementDetails'

export default function Announcement() {
  var image = require('../../../assets/announcements/notice.jpeg');
  return (
    <>
    <StatusBar backgroundColor={'#F08E0F'} />
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex:1, paddingBottom: 10 }}>
        <ScrollView >
          <AnnouncementDetails
            title='Notice'
            date='12th Jan 2024 - 12:24:25 AM'
            content='University Will Be Closed from 20th Jan to 25th Jan, Because of Holy.'
            image = {image}
          />
          <AnnouncementDetails
            title='Notice'
            date='12th Jan 2024 - 12:24:25 AM'
            content='University Will Be Closed from 20th Jan to 25th Jan, Because of Holy.'
            image = {image}
          />
        </ScrollView>
      </View>
      <BottomBar />
    </View>
  </>
  )
}
