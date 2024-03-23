import { View, ScrollView, StatusBar } from "react-native";
import Header from "../../components/header/Header";
import BottomBar from "../../components/bottombar/BottomBar";
import ProfileCard from "../../components/profile/ProfileCard";
import PersonalDetails from "../../components/profile/PersonalDetails";
import MyVaultButton from "../../components/profile/MyVaultButton";
import Creator from "../../components/profile/Creator";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Logout from "../../components/profile/Logout";


export default function Profile({onSignOut}) {

  const navigation = useNavigation()

  const [user, setUser] = useState()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/users/getUser`;
          axios.get(URL, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => {
            setUser(response.data.data);
          })
          .catch(error => {
            console.log(error.response.data);
            onSignOut()
          });
        } else {
          console.log("something went wrong")
          onSignOut()
        }
      } catch (error) {
        console.log('Error checking authentication status:', error);
        onSignOut()
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
        <StatusBar backgroundColor={'#F08E0F'} />
        <View style={{flex:1}}>
            <Header />
            <View style={{ flex:1, paddingBottom:10 }}>
              <ScrollView >
                {user?
                (
                  <>
                    <ProfileCard user={user} />
                    <PersonalDetails user={user} />
                    <MyVaultButton />
                    <Creator />
                    <Logout onSignOut={onSignOut} />
                  </>
                )
                :
                ''
                }

              </ScrollView>
            </View>
            <BottomBar />
        </View>
    </>
  )
}
