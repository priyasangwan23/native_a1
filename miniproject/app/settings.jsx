import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { RADIUS } from '../constants/theme';

const ACCENT = '#070355';

const SETTING_GROUPS = [
  {
    title: 'Preferences',
    items: [
      { icon: 'notifications-outline',  label: 'Notifications',       desc: 'Manage push alerts' },
      { icon: 'language-outline',        label: 'Language',            desc: 'English (default)' },
      { icon: 'moon-outline',            label: 'Appearance',          desc: 'Light mode' },
    ],
  },
  {
    title: 'Privacy & Security',
    items: [
      { icon: 'lock-closed-outline',     label: 'Privacy Settings',    desc: 'Control data access' },
      { icon: 'shield-checkmark-outline',label: 'App Permissions',     desc: 'Camera, Location, Contacts' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline',     label: 'Help & Support',      desc: 'FAQs and contact us' },
      { icon: 'information-circle-outline', label: 'About App',        desc: 'Version 1.0.0' },
    ],
  },
];

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Settings" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {SETTING_GROUPS.map((group) => (
          <View key={group.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            <View style={styles.card}>
              {group.items.map((item, index) => (
                <Pressable
                  key={item.label}
                  style={({ pressed }) => [
                    styles.row,
                    index < group.items.length - 1 && styles.rowBorder,
                    pressed && { backgroundColor: '#F8F9FB' },
                  ]}
                >
                  <View style={styles.iconWrap}>
                    <Ionicons name={item.icon} size={18} color={ACCENT} />
                  </View>
                  <View style={styles.rowContent}>
                    <Text style={styles.rowLabel}>{item.label}</Text>
                    <Text style={styles.rowDesc}>{item.desc}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={14} color="#CBD5E1" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  content: {
    padding: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: ACCENT + '0D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  rowDesc: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
});
