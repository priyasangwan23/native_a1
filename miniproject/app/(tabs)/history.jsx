import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { COLORS, RADIUS } from '../../constants/theme';

export default function HistoryScreen() {
  const mockHistory = [
    { id: '1', site: 'Site Alpha', date: '18 Jul 2026', status: 'Completed' },
    { id: '2', site: 'Site Beta',  date: '17 Jul 2026', status: 'Completed' },
    { id: '3', site: 'Site Gamma', date: '16 Jul 2026', status: 'Pending' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Survey History" />

      <View style={styles.content}>
        <Text style={styles.section}>Past Surveys</Text>

        {mockHistory.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={[
                styles.statusDot,
                { backgroundColor: item.status === 'Completed' ? COLORS.success : COLORS.warning }
              ]} />
              <View>
                <Text style={styles.siteName}>{item.site}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: item.status === 'Completed' ? COLORS.success + '18' : COLORS.warning + '18' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: item.status === 'Completed' ? COLORS.success : COLORS.warning }
              ]}>{item.status}</Text>
            </View>
          </View>
        ))}
      </View>
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
  },
  section: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
    letterSpacing: 0.1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  siteName: {
    fontWeight: '700',
    fontSize: 14,
    color: '#0F172A',
  },
  dateText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
});