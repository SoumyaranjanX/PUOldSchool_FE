import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Creator() {
    const navigation = useNavigation();
  return (

    <View
        style={{
        padding: 15,
        margin:10,
        elevation: -5, 
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#F08E0F',
        borderWidth: 1,
        }}
    >
        <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex: 0.75, paddingLeft:5, paddingBottom:5}}>
                <Text style={{ fontWeight:600 }}>Creator Section</Text>
            </View>
        </View>
        <TouchableOpacity style={{backgroundColor:'#0f9d58', 
            borderRadius:10, 
            padding:10, 
            paddingLeft:20, 
            marginTop:5, 
            marginBottom:5, 
            flex:1, 
            flexDirection:'row', 
            justifyContent:'center',
            alignItems:'center',
            elevation: 4, 
            shadowColor: 'gray',
            shadowOffset: {
            width: 0,
            height: 2,
            }, shadowOpacity: 0.5, shadowRadius: 4
        }}>
            <Text style={{
                fontSize: 14,
                color: 'white', 
                fontWeight: 'bold'
            }}>
                Upload a Notice
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#0f9d58', 
            borderRadius:10, 
            padding:10, 
            paddingLeft:20, 
            marginTop:5, 
            marginBottom:5, 
            flex:1, 
            flexDirection:'row', 
            justifyContent:'center',
            alignItems:'center',
            elevation: 4, 
            shadowColor: 'gray',
            shadowOffset: {
            width: 0,
            height: 2,
            }, shadowOpacity: 0.5, shadowRadius: 4
        }} onPress={() => navigation.navigate('RequestEvent')}>
            <Text style={{
                fontSize: 14,
                color: 'white', 
                fontWeight: 'bold'
            }}>
                Request for Promote an Event
            </Text>
        </TouchableOpacity>
    </View>

  )
}
