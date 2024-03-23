import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuickLinkCard from './QuickLinkCard';

const QuickLink = () => {
  const navigation = useNavigation()
  const quickLinks = [
    { id: 1, imageSource: require('../../../assets/quicklinks/events.png'), actionText: "Event's Photos" },
    { id: 2, imageSource: require('../../../assets/quicklinks/bus.png'), actionText: 'Transportation' },
    { id: 3, imageSource: require('../../../assets/quicklinks/map.png'), actionText: 'University Map' },
    { id: 4, imageSource: require('../../../assets/quicklinks/complaints.png'), actionText: 'Uni Complaints' },
  ];

  const handleClick = (action) => {
    if(action == 'Transportation'){
      navigation.navigate('SearchStop')
    }
    else if(action  == 'University Map'){
      navigation.navigate("Map")
    }
  }

  return (
    <View style={styles.quickLinkContainer}>
      {quickLinks.map((link) => (
        <QuickLinkCard
          key={link.id}
          imageSource={link.imageSource}
          actionText={link.actionText}
          onPress={() => handleClick(link.actionText)} // Replace with your action
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  quickLinkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  }
});

export default QuickLink;
