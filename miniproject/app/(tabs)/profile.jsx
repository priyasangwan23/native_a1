import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { RADIUS } from '../../constants/theme';

const ACCENT = '#070355';

const SETTINGS = [
  { icon: 'person-outline',       label: 'Edit Profile' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'lock-closed-outline',  label: 'Privacy & Security' },
  { icon: 'help-circle-outline',  label: 'Help & Support' },
  { icon: 'information-circle-outline', label: 'About App' },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header title="Profile" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>
          <Text style={styles.name}>Priya</Text>
          <Text style={styles.role}>Field Survey Engineer</Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            {[
              { label: 'Surveys', value: '24' },
              { label: 'Sites',   value: '8'  },
              { label: 'Clients', value: '5'  },
            ].map((stat) => (
              <View key={stat.label} style={styles.stat}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.section}>Account Settings</Text>

        <View style={styles.settingsCard}>
          {SETTINGS.map((item, index) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.settingRow,
                index < SETTINGS.length - 1 && styles.settingBorder,
                pressed && { backgroundColor: '#F8F9FB' },
              ]}
            >
              <View style={styles.settingIcon}>
                <Ionicons name={item.icon} size={18} color={ACCENT} />
              </View>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={14} color="#CBD5E1" />
            </Pressable>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.8 }]}
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>

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
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.lg,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: ACCENT + '0D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: ACCENT,
    fontSize: 30,
    fontWeight: '800',
  },
  name: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
  },
  role: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 3,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 40,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  section: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  settingBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#EF4444' + '30',
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 14,
  },
});
