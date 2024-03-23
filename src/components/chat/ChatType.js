import { View, TextInput, Image, TouchableOpacity } from "react-native"
import SingleChatType from "./SingleChatType"
import { useState } from "react"
import { Feather } from 'react-native-vector-icons';


import io from 'socket.io-client';

const socket = io(process.env.EXPO_PUBLIC_SOCKET_HOST);

export default function ChatType() {
    const [message, setMessage] = useState("")
    const [selectedType, setSelectedType] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBGColor, setSelectedBGColor] = useState(null);
    const [selectedPColor, setSelectedPColor] = useState(null);

    const sendMessage = () => {
        socket.emit("send_message", {
            message: message, 
            selectedType: selectedType, 
            selectedImage: selectedImage,
            selectedBGColor: selectedBGColor,
            selectedPColor: selectedPColor,
            messageTime: new Date()
        })
        setMessage('')
        setSelectedType(null)
    }
    const handleInput = (e) => {
        setMessage(e)
    }

    const buddy = require('../../../assets/buddy.png')
    const info = require('../../../assets/info.png')
    const lostfound = require('../../../assets/lostfound.webp')
    const ecom = require('../../../assets/ecom.png')

    const handleSelectChatType = (clickedType) => {
        setSelectedType(clickedType)
        if(clickedType == 'Hey Buddy'){
            setSelectedImage(buddy)
            setSelectedBGColor('#C8EEFF')
            setSelectedPColor('#4285F4')
        }
        else if(clickedType == 'Lost & Found'){
            setSelectedImage(lostfound)
            setSelectedBGColor('#d844375e')
            setSelectedPColor('#d84437')
        }
        else if(clickedType == 'Information'){
            setSelectedImage(info)
            setSelectedBGColor('#f08e0f63')
            setSelectedPColor('#f08e0f')
        }
        else if(clickedType == 'Requirement & Fulfilment'){
            setSelectedImage(ecom)
            setSelectedBGColor('#0f9d5861')
            setSelectedPColor('#0f9d58')
        }
    }

    return (
        <>
            {selectedType == null ? (
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <View style={{ width: '96%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <SingleChatType
                            image={buddy}
                            bgColor={"#C8EEFF"}
                            onclick={() => handleSelectChatType('Hey Buddy')}
                        />
                        <SingleChatType
                            image={lostfound}
                            bgColor={"#d844375e"}
                            iconWidth={35}
                            iconHeight={35}
                            onclick={() => handleSelectChatType('Lost & Found')}
                        />
                        <SingleChatType
                            image={info}
                            bgColor={"#f08e0f63"}
                            iconWidth={38}
                            iconHeight={38}
                            onclick={() => handleSelectChatType('Information')}
                        />
                        <SingleChatType
                            image={ecom}
                            bgColor={"#0f9d5861"}
                            iconWidth={35}
                            iconHeight={35}
                            onclick={() => handleSelectChatType('Requirement & Fulfilment')}
                        />
                    </View>
                </View>
            ) :
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '93%' }}>
                        <View
                            style={{
                                shadowColor: selectedBGColor,
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 5,
                                elevation: 5, // For Android
                                backgroundColor: '#fff', // Set background color to your preference
                                borderRadius: 10, // Set border radius to your preference
                                borderColor: selectedBGColor, // Set border color to your preference
                                borderWidth: 1, // Set border width to your preference
                                height: 55,
                                marginTop:10,
                                flexDirection:'row',
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                        > 
                            <TouchableOpacity style={{width:'9%', flexDirection:'column', justifyContent:'center',alignItems:'center'}} onPress={()=>setSelectedType(null)}>
                                <View style={{backgroundColor:selectedBGColor, borderRadius:20, padding:7, opacity:0.5}}>
                                    <Image source={selectedImage} style={{width:23, height:23}} />
                                </View>
                            </TouchableOpacity>
                            <View style={{width:'75%', padding:10, height:'90%', }}>
                                <TextInput onChange={(e) => {handleInput(e.nativeEvent.text)}} value={message} />
                            </View>
                            <TouchableOpacity style={{width:'14%', 
                                backgroundColor:selectedPColor, 
                                height:'80%', 
                                justifyContent:'center', 
                                alignItems:'center', 
                                borderRadius:35, 
                                shadowColor: 'red',
                                shadowOffset: {
                                    width: 2,
                                    height: 2,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 20,
                                elevation: 3, // For Android
                            }} onPress={() => {sendMessage()}}>
                                <Feather name="send" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                </View>
            }
        </>
    )
}
