import Header from "../../components/header/Header"
import Chat from "../../components/chat/Chat"
import BottomBar from "../../components/bottombar/BottomBar"
import ChatType from "../../components/chat/ChatType"
import { ScrollView, Text, View } from "react-native"

export default function Community() {
  return (
    <>
        <Header />
        <View style={{flex:1, paddingTop:5, paddingBottom:15}}>
          <ScrollView>
            <View style={{flex:1}}>
              <Chat community />
            </View>
            <ChatType />
          </ScrollView>
        </View>
        <BottomBar />
    </>
  )
}
