import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Feather } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PersonalDetails({ user }) {

  const { hostel = 'N/A', department = 'N/A', libraryId = 'N/A', dateOfBirth = 'N/A', bloodGroup = 'N/A', address = 'N/A' } = user;


  const [editable, setEditable] = useState(false);
  const [hostelLocal, setHostelLocal] = useState('Ilango');
  const [departmentLocal, setDepartmentLocal] = useState('Computer Science');
  const [libraryIdLocal, setLibraryIdLocal] = useState('S123');
  const [dateOfBirthLocal, setDateOfBirthLocal] = useState('14.01.1999');
  const [bloodGroupLocal, setBloodGroupLocal] = useState('A+');
  const [addressLocal, setAddressLocal] = useState('Lakhana, Nuapada, Odisha, 766105');

  useEffect(() => {
    setHostelLocal(hostel)
    setDepartmentLocal(department)
    setLibraryIdLocal(libraryId)
    setDateOfBirthLocal(dateOfBirth)
    setBloodGroupLocal(bloodGroup)
    setAddressLocal(address)
  }, [])

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    const data = {
        hostel: hostelLocal!='N/A'?hostelLocal:null,
        department: departmentLocal,
        libraryId: libraryIdLocal,
        dateOfBirth: dateOfBirthLocal,
        bloodGroup: bloodGroupLocal,
        address: addressLocal
    }
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/users/updatePersonalDetails`;
        axios.post(URL, data, {
          headers:{
            Authorization: `Bearer ${accessToken}`,
          }
        })
        .then( response => {
          console.log(response.data)
        })
        .catch( error => {
          console.log(error.message)
        })
      }
    } catch (error) {
      console.log('Error Updating Profile:', error);
    }
    setEditable(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: '#fff',
          margin: 10,
          padding: 10,
          borderRadius: 8,
          elevation: 4,
          shadowColor: 'gray',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
        }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '600' }}>Personal Details</Text>
          </View>
          <View>
            {editable ? (
              <TouchableOpacity onPress={handleSave}>
                <Feather name="check" size={20} color="#007AFF" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleEdit}>
                <Feather name="edit" size={20} color="#007AFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <EditableField label="Hostel" value={hostelLocal} editable={editable} onChangeText={setHostelLocal} />
        <EditableField
          label="Department"
          value={departmentLocal}
          editable={editable}
          onChangeText={setDepartmentLocal}
        />
        <EditableField label="Library ID" value={libraryIdLocal} editable={editable} onChangeText={setLibraryIdLocal} />
        <EditableField
          label="Date Of Birth"
          value={dateOfBirthLocal}
          editable={editable}
          onChangeText={setDateOfBirthLocal}
        />
        <EditableField label="Blood Group" value={bloodGroupLocal} editable={editable} onChangeText={setBloodGroupLocal} />
        <EditableField
          label="Native Address"
          value={addressLocal}
          editable={editable}
          onChangeText={setAddressLocal}
          multiline
        />
      </View>
    </View>
  );
}

const EditableField = ({ label, value, editable, onChangeText, multiline }) => {
  return (
    <View
      style={{
        backgroundColor: editable ? '#F0F0F0' : '#F08E0F',
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 14, color: editable ? '#333333' : 'white', marginRight: 10, width: 100 }}>{label}:</Text>
      {editable ? (
        <TextInput
          style={{ flex: 1, fontSize: 14, color: 'black', fontWeight: 'bold', paddingTop: 0, paddingBottom: 0 }}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
        />
      ) : (
        <Text style={{ flex: 1, fontSize: 14, color: 'white', fontWeight: 'bold' }}>{value}</Text>
      )}
    </View>
  );
};
