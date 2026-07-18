import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ACCENT = '#070355';

export default function Header({ title = 'Dashboard' }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {/* Hamburger */}
      <Pressable
        onPress={() => navigation.toggleDrawer()}
        style={({ pressed }) => [styles.menuBtn, pressed && { opacity: 0.6 }]}
      >
        <Ionicons name="menu" size={24} color={ACCENT} />
      </Pressable>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right: notification bell */}
      <Pressable style={styles.bellBtn}>
        <Ionicons name="notifications-outline" size={22} color={ACCENT} />
        <View style={styles.bellDot} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
  },
  menuBtn: {
    padding: 4,
    marginRight: 12,
  },
  title: {
    flex: 1,
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  bellBtn: {
    position: 'relative',
    padding: 4,
  },
  bellDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
});