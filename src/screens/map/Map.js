import React, { useState, useRef } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import Header from "../../components/header/Header"
import BottomBar from "../../components/bottombar/BottomBar"

const Map = () => {
  const mapRef = useRef(null);

  const pondicherryUniversityLocation = {
    latitude: 12.0264645,
    longitude: 79.8537561,
    latitudeDelta: 0.02, // Adjust zoom level
    longitudeDelta: 0.02, // Adjust zoom level
  };

  const [region, setRegion] = useState(pondicherryUniversityLocation);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegionChange = (newRegion) => {
    // Define the boundaries of Pondicherry University
    const minLat = 12.030580;
    const maxLat = 12.018162;
    const minLng = 79.854542;
    const maxLng = 79.843345;

    // Check if the new region is within the boundaries of Pondicherry University
    if (
      newRegion.latitude < minLat ||
      newRegion.latitude > maxLat ||
      newRegion.longitude < minLng ||
      newRegion.longitude > maxLng
    ) {
      // If it's outside the boundaries, set the region back to Pondicherry University
      setRegion(pondicherryUniversityLocation);
    } else {
      // Otherwise, update the region
      setRegion(newRegion);
    }
  };

  const handleSearch = () => {
    // Implement your search logic here
    // For example, you can use Geocoding APIs to search for locations
    // Update the region based on the search result
    // setRegion(newRegion);
  };

  return (
    

    <>
    <StatusBar backgroundColor={'#F08E0F'} />
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex:1, paddingBottom: 10 }}>
      <View style={styles.container}>
      <SearchBar
        placeholder="Search for location..."
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
        value={searchQuery}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchInput}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={pondicherryUniversityLocation}
        region={region}
        onRegionChange={handleRegionChange}
        scrollEnabled={true} // Disable panning
        minZoomLevel={14} // Set minimum zoom level
        maxZoomLevel={21} // Set maximum zoom level (same as minimum)
      >
        <Marker
          coordinate={{ latitude: 12.014829, longitude: 79.8547828 }}
          title="Computer Science New Building"
          description="Computer Science New Building"
          
        />
        <Marker
          coordinate={{ latitude: 12.02334, longitude: 79.8461688 }}
          title="New girls Hostel"
          description="Under Construction"
          
        />
        <Marker
          coordinate={{ latitude: 12.023609, longitude: 79.852640 }}
          title="New Building Physical Education"
          description="Department of Physical Education"
          
        />
      </MapView>
    </View>
      </View>
      <BottomBar />
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
});

export default Map;