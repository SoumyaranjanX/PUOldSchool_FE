import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuickLinkCard = ({ imageSource, actionText, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.actionText}>{actionText}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    cardContainer: {
        width: '48%', // 48% to allow some space between cards
        marginBottom: 5,
        margin:3,
        backgroundColor: '#fff', // Card background color
        borderRadius: 10,
        padding: 8,
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

export default QuickLinkCard;