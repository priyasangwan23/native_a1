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
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { RADIUS } from '../constants/theme';
import { updateSurveyField } from '../constants/store';

const ACCENT = '#070355';

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [address, setAddress]   = useState(null);
  const [loading, setLoading]   = useState(true);

  const getLocation = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied');
      setLoading(false);
      return;
    }
    const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setLocation(loc);
    let addrText = '';
    const addr = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
    if (addr.length > 0) {
      const a = addr[0];
      setAddress(a);
      const parts = [a.city, a.region, a.country].filter(Boolean);
      if (parts.length > 0) {
        addrText = ` - ${parts.join(', ')}`;
      }
    }
    const formatted = `Lat: ${loc.coords.latitude.toFixed(4)}, Lng: ${loc.coords.longitude.toFixed(4)}${addrText}`;
    updateSurveyField('location', formatted);
    setLoading(false);
  };

  useEffect(() => { getLocation(); }, []);

  const copyLocation = async () => {
    if (!location) return;
    const text = `Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`;
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied', 'Location copied to clipboard');
  };

  const InfoRow = ({ icon, label, value, color = ACCENT }) => (
    <View style={styles.infoRow}>
      <View style={[styles.infoIcon, { backgroundColor: color + '0D' }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Location" />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={ACCENT} />
          <Text style={styles.loadingText}>Fetching Location...</Text>
        </View>
      ) : (
        <>
          {/* Map */}
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

          {/* Info card */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Current Location</Text>

            <InfoRow
              icon="navigate-outline"
              label="Latitude"
              value={location.coords.latitude.toFixed(6)}
            />
            <InfoRow
              icon="navigate-circle-outline"
              label="Longitude"
              value={location.coords.longitude.toFixed(6)}
            />
            <InfoRow
              icon="radio-outline"
              label="Accuracy"
              value={`${location.coords.accuracy?.toFixed(0)} m`}
            />

            {address && (
              <>
                <View style={styles.divider} />
                <InfoRow
                  icon="business-outline"
                  label="City"
                  value={address.city || '—'}
                />
                <InfoRow
                  icon="map-outline"
                  label="Region"
                  value={address.region || '—'}
                />
                <InfoRow
                  icon="earth-outline"
                  label="Country"
                  value={address.country || '—'}
                />
              </>
            )}

            {/* Buttons */}
            <View style={styles.btnRow}>
              <Pressable
                onPress={getLocation}
                style={({ pressed }) => [styles.btn, { backgroundColor: ACCENT, marginRight: 8 }, pressed && { opacity: 0.8 }]}
              >
                <Ionicons name="refresh-outline" size={18} color="#fff" />
                <Text style={styles.btnText}>Refresh</Text>
              </Pressable>

              <Pressable
                onPress={copyLocation}
                style={({ pressed }) => [styles.btn, { backgroundColor: '#F8F9FB', borderWidth: 1, borderColor: '#EAECF0', marginLeft: 8 }, pressed && { opacity: 0.8 }]}
              >
                <Ionicons name="copy-outline" size={18} color={ACCENT} />
                <Text style={[styles.btnText, { color: ACCENT }]}>Copy</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  map: {
    width: '100%',
    height: '42%',
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: -20,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
    letterSpacing: 0.1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  infoValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '700',
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAECF0',
    marginVertical: 12,
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 13,
    borderRadius: RADIUS.md,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 14,
    color: '#64748B',
    fontSize: 14,
  },
});