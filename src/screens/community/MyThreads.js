import Header from "../../components/header/Header"
import BottomBar from "../../components/bottombar/BottomBar"
import { Text, View, ScrollView, Animated, Image, TouchableOpacity } from "react-native"
import { Feather } from 'react-native-vector-icons';


export default function MyThreads() {
    return (
        <>
            <Header />
            <View style={{ flex: 1, paddingTop: 5, paddingBottom: 15 }}>
                <ScrollView>
                    
                    <TouchableOpacity style={{ marginTop: 10, justifyContent:'center', flexDirection:'row' }}>
                        <View style={{
                            width: '93%',
                            padding: 10,
                            shadowColor: '#464646',
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 3,
                            elevation: 3, // For Android
                            backgroundColor: '#fff', // Set background color to your preference
                            borderRadius: 10, // Set border radius to your preference

                        }}>
                            <Animated.View style={[{ flexDirection: 'row', marginBottom: 0, marginTop: 0 }]}>
                                <View style={{ width: 70 }}>
                                    <View style={{ width: 45, height: 45, backgroundColor: 'blue', borderRadius: 50, overflow: 'hidden' }}>
                                        <Image
                                            source={{ uri: 'https://google.com' }}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                            <View style={{ paddingRight: 15, paddingTop: 3, paddingBottom: 3, borderRadius: 20 }}>
                                                <Text style={{ color: 'red', fontSize: 12, backgroundColor: 'red', paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, borderRadius: 8 }}>{'messageType'}</Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={{ fontSize: 11, color: 'gray' }}>
                                                {'formattedTime'}
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
                                            borderColor: 'red',
                                            backgroundColor: '#FFF',
                                            shadowColor: 'red',
                                            shadowOffset: {
                                                width: 0,
                                                height: 3,
                                            },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 5,
                                            elevation: 5,
                                        }}>
                                            <Text style={{ textAlign: 'justify' }}>{'message'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>

                            <View style={{ flexDirection:'row', alignItems:'center', marginLeft:15, marginTop:10 }}>
                                <Feather name="corner-up-left" size={25} color="#666666" />
                                <Text style={{marginLeft:20}}>This is the last message</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </ScrollView>
            </View>
            <BottomBar />
        </>
    )
}
