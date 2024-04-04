import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Feather } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileCard = ({ user }) => {
  const [profileImageUrl, setProfileImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const { name, regNo, email, imageUrl } = user;

  useEffect(() => {
    setLoading(true);
    setProfileImageUrl(imageUrl);
    setLoading(false);
  }, [imageUrl]);

  const openDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: false,
      });
      if (!result.canceled) {
        setLoading(true); // Set loading state to true during upload
        const formData = new FormData();

        formData.append('image', {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: result.assets[0].name,
        });

        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          if (accessToken) {
            const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/users/changeProfileImage`;

            axios
              .post(URL, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              .then(response => {
                console.log(response.data);
                setProfileImageUrl(response.data.data.finalImageUrl);

                console.log("profileImageUrl", profileImageUrl)
              })
              .catch(error => {
                console.error('Error uploading image:', error.message);
                Alert.alert('Error uploading image. Please try again.');
              })
              .finally(() => {
                setLoading(false); // Set loading state to false after upload
              });
          } else {
            // Handle case where access token is not available
          }
        } catch (error) {
          console.log('Error checking authentication status:', error);
        }
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error picking document. Please try again.');
    }
  };

  return (
    <View style={{ overflow: 'hidden' }}>
      <LinearGradient
        colors={['#F08E0F', '#D97E0A', '#B86907', '#945504']}
        style={{ borderRadius: 10, elevation: 5, margin: 10, borderRadius: 10 }}
      >
        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginBottom: 10,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              position: 'relative',
            }}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              profileImageUrl && (
                <Image
                  source={{ uri: `${profileImageUrl}?${new Date().getTime()}` }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              )
            )}

            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                right: 5,
                backgroundColor: 'gray',
                borderRadius: 20,
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={openDocumentPicker}
            >
              <Feather name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 2 }}>{name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Text style={{ fontSize: 14, color: 'white', marginRight: 5 }}>Reg. No:</Text>
            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>{regNo}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Text style={{ fontSize: 14, color: 'white', marginRight: 5 }}>Email:</Text>
            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>{email}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ProfileCard;
