import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomBar = () => {
  const navigation = useNavigation();

  const pulseAnimation = React.useRef(new Animated.Value(1)).current;

  const handleCenterTabPress = () => {
    Animated.sequence([
      Animated.timing(pulseAnimation, { toValue: 0.8, duration: 100, easing: Easing.linear, useNativeDriver: true }),
      Animated.timing(pulseAnimation, { toValue: 1, duration: 100, easing: Easing.linear, useNativeDriver: true }),
    ]).start(() => {
      navigation.navigate('Community');
    });
  };

  const pulseStyle = {
    transform: [{ scale: pulseAnimation }],
  };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
        <Icon name="home-outline" size={24} color="#888" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.centerTab} onPress={handleCenterTabPress}>
        <Animated.View style={[styles.centerTabBackground, pulseStyle]}>
          <Icon name="people-outline" size={32} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Action')}>
        <Icon name="list" size={24} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
  },
  centerTabBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FF5F6D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#FFF',
  },
});

export default BottomBar;
