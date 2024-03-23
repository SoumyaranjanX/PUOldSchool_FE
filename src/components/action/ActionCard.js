import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native"

export default function ActionCard({ imageSource, actionText }) {
  return (
    <View style={{flexDirection:'row', justifyContent:'center'}}>
        <TouchableOpacity style={styles.cardContainer}>
            <Image source={imageSource} style={styles.cardImage} />
            <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '93%', // 48% to allow some space between cards
        marginBottom: 5,
        margin:5,
        backgroundColor: '#fff', // Card background color
        borderRadius: 10,
        padding: 12,
        flexDirection:'row',
        alignItems: 'center',
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    cardImage: {
        width: 40,
        height: 40,
    },
    actionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333', // Text color
        textAlign: 'center',
        marginLeft: 8,
    },

});
