import { View, StatusBar, Image, TextInput, Text, TouchableOpacity, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignIn({onSignIn}) {

    const navigatation = useNavigation()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please Enter Email & Password');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        const data = {
            email,
            password
        }
        const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/users/login`

        axios.post(URL, data)
            .then( async response => {
                if(response.data.statusCode == 200){
                    const accessToken = response.data.data.accessToken
                    try {
                        await AsyncStorage.setItem('accessToken', accessToken);
                        console.log('Access token stored successfully');
                    } catch (error) {
                        console.log('Error storing access token:', error);
                    }
                    onSignIn();
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data)
                    Alert.alert(error.response.data.message)
                } else if (error.request) {
                    console.log('No response received:', error.request);
                } else {
                    console.log('Error:', error.message);
                }
            })

    }

    const logo = require('../../../assets/logo/logo_rc_transbg.png');

    return (
        <>
            <StatusBar backgroundColor={'#F08E0F'} />
            <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingBottom:100,}}>
                <Image 
                    source = {logo}
                    style = {{
                        width: 190,
                        height: 80
                    }}
                />
                <Text style={{
                    fontSize:30,
                    fontWeight:600,
                    color:'#F08E0F',
                    marginTop:50
                    
                }}>Welcome</Text>


                <TextInput 
                    style = {{
                        backgroundColor:'white',
                        width:'85%',
                        padding:15,
                        borderRadius:15,
                        marginTop:20

                    }}
                    placeholder = "Email"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />

                <TextInput 
                    style = {{
                        backgroundColor:'white',
                        width:'85%',
                        padding:15,
                        borderRadius:15,
                        marginTop:20

                    }}
                    placeholder = "Password"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: '#F08E0F',
                        width: '85%',
                        padding: 15,
                        borderRadius: 15,
                        marginTop: 20,
                        alignItems: 'center',
                    }}
                    onPress={handleSubmit}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => navigatation.navigate('SignUp')}>
                    <Text style={{ color: '#000', fontSize: 16, marginTop:20 }}>New to Old School? Sign Up</Text>
                </TouchableOpacity> 

            </View>
        </>
    )
}


export default SignIn;