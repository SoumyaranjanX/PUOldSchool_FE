import Header from "../../components/header/Header"
import Chat from "../../components/chat/Chat"
import BottomBar from "../../components/bottombar/BottomBar"
import ChatType from "../../components/chat/ChatType"
import { useNavigation } from "@react-navigation/native"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

export default function Community() {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View style={{ flex: 1, paddingTop: 5, paddingBottom: 15 }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={{
              flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', margin: 10, padding: 10, borderRadius: 8, elevation: 4, shadowColor: 'gray',
              shadowOffset: {
                width: 0,
                height: 2,
              }, shadowOpacity: 0.5, shadowRadius: 4
            }} onPress={() => navigation.navigate('MyThreads')}>
              <Text style={{color:'white', fontSize:15, fontWeight:700}}>My Active Threads</Text>
            </TouchableOpacity>
            <Chat community />
          </View>
          <ChatType />
        </ScrollView>
      </View>
      <BottomBar />
    </>
  )
}
