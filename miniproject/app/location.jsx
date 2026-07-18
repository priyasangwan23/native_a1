import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';
import MapView, { Marker } from 'react-native-maps';
import Header from '../components/Header';

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📍 Get Location
  const getLocation = async () => {
    setLoading(true);

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied');
      setLoading(false);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setLocation(loc);

    // 🔥 Reverse Geocode
    const addr = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    if (addr.length > 0) {
      setAddress(addr[0]);
    }

    setLoading(false);
  };

  useEffect(() => {
    getLocation();
  }, []);

  // 📋 Copy Location
  const copyLocation = async () => {
    if (!location) return;

    const text = `Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`;
    await Clipboard.setStringAsync(text);

    Alert.alert('Copied', 'Location copied to clipboard');
  };

  return (
    <View style={styles.container}>
      <Header title="Location" />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Fetching Location...</Text>
        </View>
      ) : (
        <>
          {/* 🗺️ MAP */}
          <MapView
            style={styles.map}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
            />
          </MapView>

          {/* 📍 DETAILS */}
          <View style={styles.info}>
            <Text style={styles.text}>
              Latitude: {location.coords.latitude}
            </Text>

            <Text style={styles.text}>
              Longitude: {location.coords.longitude}
            </Text>

            <Text style={styles.text}>
              Accuracy: {location.coords.accuracy} m
            </Text>

            {address && (
              <>
                <Text style={styles.text}>
                  City: {address.city}
                </Text>
                <Text style={styles.text}>
                  Region: {address.region}
                </Text>
                <Text style={styles.text}>
                  Country: {address.country}
                </Text>
              </>
            )}

            {/* Buttons */}
            <Pressable style={styles.button} onPress={getLocation}>
              <Text style={styles.btnText}>Refresh Location</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={copyLocation}>
              <Text style={styles.btnText}>Copy Location</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '45%',
  },
  info: {
    flex: 1,
    padding: 15,
  },
  text: {
    fontSize: 15,
    marginVertical: 3,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});