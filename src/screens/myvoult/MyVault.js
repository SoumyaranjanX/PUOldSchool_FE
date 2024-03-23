import { View, StatusBar } from "react-native"
import Header from "../../components/header/Header"
import BottomBar from "../../components/bottombar/BottomBar"

export default function MyVault() {
  return (
    <>
        <StatusBar backgroundColor={'#F08E0F'} />
        <View style={{flex:1}}>
            <Header />
            <View style={{ flex:1, paddingBottom:10 }}>
              <ScrollView >
       

              </ScrollView>
            </View>
            <BottomBar />
        </View>
    </>
  )
}
