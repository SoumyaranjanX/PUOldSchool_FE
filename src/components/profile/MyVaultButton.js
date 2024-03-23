import { View, Text, TouchableOpacity } from "react-native"

export default function MyVaultButton() {
  return (
    <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#4A90E2', margin:10, padding:10, borderRadius:8, elevation: 4, shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    }, shadowOpacity: 0.5, shadowRadius: 4}}>
        <Text style={{color:'white', fontSize:15, fontWeight:700}}>My Vault Settings</Text>
    </TouchableOpacity>

  )
}
