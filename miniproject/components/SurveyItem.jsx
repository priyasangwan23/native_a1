import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RADIUS } from '../constants/theme';

const ACCENT = '#070355';

const PRIORITY_CONFIG = {
  High:   { color: '#EF4444', bg: '#FEF2F2' },
  Medium: { color: '#F59E0B', bg: '#FFFBEB' },
  Low:    { color: '#10B981', bg: '#ECFDF5' },
};

export default function SurveyItem({ item, onPress }) {
  const config = PRIORITY_CONFIG[item.priority] || { color: ACCENT, bg: ACCENT + '12' };

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && { backgroundColor: '#F8F9FB' }]}
      onPress={onPress}
    >
      <View style={styles.left}>
        <Text style={styles.title}>{item.site}</Text>
        <Text style={styles.client}>{item.client}</Text>
      </View>

      <View style={styles.right}>
        {item.priority && (
          <View style={[styles.badge, { backgroundColor: config.bg }]}>
            <Text style={[styles.badgeText, { color: config.color }]}>{item.priority}</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={14} color="#CBD5E1" style={{ marginTop: 2 }} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: RADIUS.md,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  left: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    color: '#0F172A',
  },
  client: {
    marginTop: 2,
    color: '#64748B',
    fontSize: 12,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});