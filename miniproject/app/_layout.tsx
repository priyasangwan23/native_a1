import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#2563EB',
        drawerLabelStyle: {
          fontSize: 15,
        },
      }}
    >
      {/* Tabs (Main Home) */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
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
    </Drawer>
  );
}