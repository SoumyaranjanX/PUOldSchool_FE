import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
// import Pdf from 'react-native-pdf';

const PDFViewer = ({ image }) => {
  return (
    <View style={styles.container}>
        <Image style={{flex:1, width:'100%'}}
          source={image} 
          resizeMode='contain'
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PDFViewer;
