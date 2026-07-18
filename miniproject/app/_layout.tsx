import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.subtext,
        drawerActiveBackgroundColor: COLORS.primary + '14',
        drawerStyle: {
          backgroundColor: COLORS.card,
          width: 270,
          paddingTop: 20,
        },
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginLeft: -8,
        },
        drawerItemStyle: {
          borderRadius: 12,
          marginHorizontal: 8,
          marginVertical: 2,
        },
      }}
    >
      {/* Dashboard (Tabs) */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Survey */}
      <Drawer.Screen
        name="(tabs)/new-survey"
        options={{
          title: 'Survey',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Camera */}
      <Drawer.Screen
        name="camera"
        options={{
          title: 'Camera',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="camera-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Contacts */}
      <Drawer.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Location */}
      <Drawer.Screen
        name="location"
        options={{
          title: 'Location',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Clipboard */}
      <Drawer.Screen
        name="clipboard"
        options={{
          title: 'Clipboard',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Settings */}
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({});