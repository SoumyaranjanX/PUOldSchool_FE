import { Image, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"

export default function SingleChatType({ image, bgColor, onclick, iconWidth = 45, iconHeight = 45 }) {
    var selectedType = useState('')
    function clicked(){
      console.log('hello')
    }
    return (
        <TouchableOpacity style={{
          width: '22%',
          backgroundColor: bgColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 3,
          borderRadius: 10,
          shadowColor: bgColor,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5, // For Android
          alignItems: 'center'
        }} onPress={() => onclick()}>
          <Image
            source={image}
            style={{ width: iconWidth, height: iconHeight }}
          />
        </TouchableOpacity>
    )
}
