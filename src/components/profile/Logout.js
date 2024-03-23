import { View, Text, TouchableOpacity } from "react-native"
import { Feather } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Logout({onSignOut}) {

  const navigation = useNavigation();

  const handleLogout = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/users/logout`;
          axios.post(URL, null, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => {
            console.log(response.data.data);
            AsyncStorage.removeItem('accessToken').then(() => {
              console.log('Access token removed from AsyncStorage');
              onSignOut();
            }).catch(error => {
              console.log('Error removing access token from AsyncStorage:', error);
            });
          })
          .catch(error => {
            console.log(error.response.data);
          });
        } else {
          // navigation.navigate('Signin');
        }
      } catch (error) {
        console.log('Error checking authentication status:', error);
      }
  
  }

  return (
    <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:'red', margin:10, padding:10, borderRadius:8, elevation: 4, shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    }, shadowOpacity: 0.5, shadowRadius: 4}}
    onPress={handleLogout}>
        <Text style={{color:'white', fontSize:15, fontWeight:700}}>Logout </Text><Feather name="log-out" size={25} color="#fff" />
    </TouchableOpacity>

  )
}
