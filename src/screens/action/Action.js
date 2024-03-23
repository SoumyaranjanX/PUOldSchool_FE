import { View, ScrollView } from "react-native";
import Header from "../../components/header/Header"
import BottomBar from "../../components/bottombar/BottomBar"
import ActionCard from "../../components/action/ActionCard"

export default function Action() {
    const imageSource = require('../../../assets/1.webp');
  return (
    <>
      <View style={{flex:1}}>
        <Header />
        <View style={{ flex:1, paddingBottom: 10 }}>
          <ScrollView >
            <ActionCard imageSource = {imageSource} actionText={"Event Photos"} />
            <ActionCard imageSource = {imageSource} actionText={"Transportation"} />
            <ActionCard imageSource = {imageSource} actionText={"University Map"} />
            <ActionCard imageSource = {imageSource} actionText={"Vault System"} />
            <ActionCard imageSource = {imageSource} actionText={"University Calander"} />
            <ActionCard imageSource = {imageSource} actionText={"University Notice"} />
            <ActionCard imageSource = {imageSource} actionText={"Complaint & Contacts"} />
            <ActionCard imageSource = {imageSource} actionText={"Urgent Message"} />
          </ScrollView>
        </View>
        <BottomBar />
      </View>
    </>
  )
}
