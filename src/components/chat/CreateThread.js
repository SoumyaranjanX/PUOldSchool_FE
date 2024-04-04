import { useState } from 'react';
import { Text, View, ScrollView, Dimensions, TouchableOpacity, Image, Animated, TextInput } from 'react-native'
import { Feather } from 'react-native-vector-icons';

export default function CreateThread({ messageId, userImage, formattedTime, message, pColor, bgColor, messageType, closeModal }) {
    const [typeMessage, setTypeMessage] = useState('');

    const handleInput = (text) => {
        setTypeMessage(text)
    }

    const CreateThread = () => {
        console.log("Message Id: ",messageId)
        console.log("Thread Message: ",typeMessage)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ width: Dimensions.get('window').width * 0.9, maxHeight: Dimensions.get('window').height * 0.8, backgroundColor: 'white', borderRadius: 15, paddingTop: 40, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, overflow: 'hidden' }}>
                <TouchableOpacity onPress={closeModal} style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    <Feather name="x" size={25} color="#666666" />
                </TouchableOpacity>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>Create Thread On</Text>
                <View style={{ 
                    padding:10, 
                    borderRadius:15,
                    borderColor:bgColor,
                    borderWidth:2
                }}>
                <Animated.View style={[{ flexDirection: 'row', marginBottom: 0, marginTop: 0 }]}>
                    <View style={{ width: 70 }}>
                        <View style={{ width: 45, height: 45, backgroundColor: 'blue', borderRadius: 50, overflow: 'hidden' }}>
                            <Image
                                source={{ uri: userImage }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                <View style={{ paddingRight: 15, paddingTop: 3, paddingBottom: 3, borderRadius: 20 }}>
                                    <Text style={{ color: pColor, fontSize: 12, backgroundColor: bgColor, paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, borderRadius: 8 }}>{messageType}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 11, color: 'gray' }}>
                                    {formattedTime}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <View style={{
                                padding: 15,
                                borderTopRightRadius: 20,
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                                borderWidth: 1,
                                borderColor: bgColor,
                                backgroundColor: '#FFF',
                                shadowColor: pColor,
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 5,
                                elevation: 5,
                            }}>
                                <Text style={{ textAlign: 'justify' }}>{message}</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '100%' }}>
                        <View
                            style={{
                                shadowColor: bgColor,
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 5,
                                elevation: 5, // For Android
                                backgroundColor: '#fff', // Set background color to your preference
                                borderRadius: 10, // Set border radius to your preference
                                borderColor: bgColor, // Set border color to your preference
                                borderWidth: 1, // Set border width to your preference
                                height: 55,
                                marginTop:10,
                                flexDirection:'row',
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                        > 
                            <View style={{width:'75%', padding:10, height:'90%'}}>
                                <TextInput onChange={(e) => {handleInput(e.nativeEvent.text)}} value={typeMessage} placeholder='Chat on Private Thread' />
                            </View>
                            <TouchableOpacity style={{width:'14%', 
                                backgroundColor:bgColor, 
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
                            }} onPress={() => {CreateThread()}}>
                                <Feather name="send" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                </View>
            </View>
        </View>
    )
}
