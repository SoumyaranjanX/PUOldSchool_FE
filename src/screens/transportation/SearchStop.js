import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../../components/header/Header';
import BottomBar from '../../components/bottombar/BottomBar';
import SearchableDropdown from 'react-native-searchable-dropdown';
import axios from 'axios';

export default function SearchStop() {
  const [stops] = useState([
    { id: 1, name: 'Library' },
    { id: 2, name: 'Ponlite ' },
    { id: 3, name: 'Narmada' },
    { id: 4, name: 'BoysMess' },
    { id: 5, name: 'FoodScience' },
    { id: 6, name: 'Sj' },
  ]);
  const [data, setData] = useState({
    towardLibrary: [],
    towardSJ: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = (selectedStartPoint) => {
    setLoading(true);
    setError(null);
    const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/bus/getbustime`;
    axios.post(URL, { stoppage: selectedStartPoint })
      .then(response => {
        if (response.data.message) {
          // If there's an error message in the response, handle it
          console.error('Error fetching data:', response.data.message);
          setError(new Error(response.data.message));
          setData({ towardLibrary: [], towardSJ: [] }); // Set empty data to avoid 'undefined' errors
        } else {
          // Set the data if there's no error message
          setData(response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        setError(error);
        setLoading(false);
      });
  };

  const handleStartPointSelect = (stop) => {
    fetchData(stop.name);
  };

  // Assuming you have useState for data, loading, and error states

  return (
    <>
      <StatusBar backgroundColor={'green'} />
      <Header />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Select 🚌 Locations</Text>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Stopage :</Text>
            <SearchableDropdown
              onTextChange={(text) => console.log(text)}
              onItemSelect={handleStartPointSelect}
              containerStyle={styles.dropdown}
              textInputStyle={styles.dropdownInput}
              itemStyle={styles.dropdownItem}
              itemTextStyle={styles.dropdownItemText}
              items={stops}
              defaultIndex={0}
              placeholder="Current Stopage"
              resetValue={false}
              underlineColorAndroid="transparent"
            />
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#3498DB" />
          ) : error ? (
            <Text style={styles.errorText}>Error: {error.message}</Text>
          ) : (
            data && data.towardSJ && data.towardLibrary ? (
              <View style={{ flex: 1 }}>
                <View style={styles.table}>
                  <View style={styles.tableRowHeader}>
                    <Text style={styles.tableCellHeader}>Towards SJ</Text>
                    <Text style={styles.tableCellHeader}>Towards Library</Text>
                  </View>
                  <View style={styles.tableRow}>
                    {data.towardSJ.map((item, index) => (
                      <Text key={`towardSJ-${index}`} style={styles.tableCell}>
                        {item}
                      </Text>
                    ))}
                    {data.towardLibrary.map((item, index) => (
                      <Text key={`towardLibrary-${index}`} style={styles.tableCell}>
                        {item}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ) : (
              <Text style={styles.errorText}>No data available</Text>
            )
          )}

        </View>
      </View>
      <BottomBar />
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 70,
    backgroundColor: '#F4F6F7',
  },
  searchContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#34495E',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#34495E',
    textAlign: 'center',
  },
  dropdown: {
    borderWidth: 3,
    borderColor: '#BDC3C7',
    borderRadius: 10,
    width: 280,
  },
  dropdownInput: {
    padding: 1,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495E',
    height: 40,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#ECF0F1',
    borderColor: '#BDC3C7',
    borderWidth: 3,
    borderRadius: 5,
    marginBottom: 5,
    width: 270,
  },
  dropdownItemText: {
    color: '#34495E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#3498DB',
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
    paddingVertical: 8,
  },
  tableCellHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#34495E',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});
