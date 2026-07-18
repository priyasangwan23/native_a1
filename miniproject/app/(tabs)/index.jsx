import {
  View, Text, StyleSheet, ScrollView,
  Pressable,
} from 'react-native';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
import ActionCard from '../../components/ActionCard';
import SurveyItem from '../../components/SurveyItem';
import WeeklyBarChart from '../../components/WeeklyBarChart';
import { COLORS, RADIUS, SHADOWS } from '../../constants/theme';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// ─── Mock Data ────────────────────────────────────────────────
const ACCENT = '#070355';

const WEEKLY_DATA = [
  { label: 'Mon', value: 2 },
  { label: 'Tue', value: 5 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 7 },
  { label: 'Fri', value: 4 },
  { label: 'Sat', value: 6, today: true },
  { label: 'Sun', value: 1 },
];

const SURVEYS_DONE = 18;
const SURVEYS_TOTAL = 24;
const COMPLETION_PCT = Math.round((SURVEYS_DONE / SURVEYS_TOTAL) * 100);

const STATUS_BREAKDOWN = [
  { label: 'Completed', count: 18, color: ACCENT },
  { label: 'Pending',   count: 4,  color: '#94A3B8' },
  { label: 'Overdue',   count: 2,  color: '#EF4444' },
];

const RECENT_SURVEYS = [
  { id: '1', site: 'Site Alpha', client: 'Client X', priority: 'High'   },
  { id: '2', site: 'Site Beta',  client: 'Client Y', priority: 'Medium' },
  { id: '3', site: 'Site Gamma', client: 'Client Z', priority: 'Low'    },
];

// ─── Helpers ─────────────────────────────────────────────────

/** A thin horizontal progress bar */
function ProgressBar({ pct, color, height = 6 }) {
  return (
    <View style={[pbStyles.track, { height, borderRadius: height / 2 }]}>
      <View
        style={[
          pbStyles.fill,
          { width: `${pct}%`, backgroundColor: color, borderRadius: height / 2 },
        ]}
      />
    </View>
  );
}
const pbStyles = StyleSheet.create({
  track: { backgroundColor: '#E2E8F0', overflow: 'hidden' },
  fill:  { height: '100%' },
});

/** Simple stat pill */
function StatPill({ icon, value, label }) {
  return (
    <View style={sp.pill}>
      <Ionicons name={icon} size={18} color={ACCENT} />
      <Text style={sp.value}>{value}</Text>
      <Text style={sp.label}>{label}</Text>
    </View>
  );
}
const sp = StyleSheet.create({
  pill: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: 14,
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
});

// ─── Main Component ──────────────────────────────────────────
export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Stats Row ─────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.statsRow}>
            <StatPill icon="clipboard-outline"      value="24"  label="Total" />
            <View style={styles.statDivider} />
            <StatPill icon="checkmark-circle-outline" value="18" label="Done"  />
            <View style={styles.statDivider} />
            <StatPill icon="time-outline"           value="4"   label="Pending"/>
            <View style={styles.statDivider} />
            <StatPill icon="alert-circle-outline"   value="2"   label="Overdue"/>
          </View>
        </View>

        {/* ── Completion Section ─────────────────── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Completion Rate</Text>

          {/* Horizontal progress + percent label */}
          <View style={styles.completionRow}>
            <View style={{ flex: 1 }}>
              <ProgressBar pct={COMPLETION_PCT} color={ACCENT} height={10} />
              <Text style={styles.completionSub}>
                {SURVEYS_DONE} of {SURVEYS_TOTAL} surveys completed
              </Text>
            </View>
            <Text style={styles.completionPct}>{COMPLETION_PCT}%</Text>
          </View>

          {/* Status breakdown */}
          <View style={styles.breakdownList}>
            {STATUS_BREAKDOWN.map((s) => (
              <View key={s.label} style={styles.breakdownRow}>
                <View style={[styles.dot, { backgroundColor: s.color }]} />
                <Text style={styles.breakdownLabel}>{s.label}</Text>
                <ProgressBar
                  pct={(s.count / SURVEYS_TOTAL) * 100}
                  color={s.color}
                  height={5}
                />
                <Text style={styles.breakdownCount}>{s.count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Weekly Activity Chart ──────────────── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Weekly Activity</Text>
            <Text style={styles.cardSub}>Surveys per day</Text>
          </View>
          <WeeklyBarChart data={WEEKLY_DATA} accentColor={ACCENT} />
        </View>

        {/* ── Quick Actions ─────────────────────── */}
        <Text style={styles.section}>Quick Actions</Text>
        <View style={styles.row}>
          <ActionCard title="New Survey" icon="document-text-outline"
            onPress={() => router.push('/(tabs)/new-survey')} />
          <ActionCard title="Camera"    icon="camera-outline"
            onPress={() => router.push('/camera')} />
          <ActionCard title="Location"  icon="location-outline"
            onPress={() => router.push('/location')} />
        </View>
        <View style={styles.row}>
          <ActionCard title="Contacts"  icon="people-outline"
            onPress={() => router.push('/contacts')} />
          <ActionCard title="Clipboard" icon="clipboard-outline"
            onPress={() => router.push('/clipboard')} />
          <ActionCard title="History"   icon="time-outline"
            onPress={() => router.push('/(tabs)/history')} />
        </View>

        {/* ── Activity Summary strip ────────────── */}
        <View style={[styles.card, styles.activityStrip]}>
          <Ionicons name="trending-up-outline" size={20} color={ACCENT} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.stripTitle}>{"This week's best day"}</Text>
            <Text style={styles.stripSub}>Thursday — 7 surveys completed</Text>
          </View>
          <Text style={styles.stripBadge}>🏆</Text>
        </View>

        {/* ── Recent Surveys ────────────────────── */}
        <View style={styles.sectionRow}>
          <Text style={styles.section}>Recent Surveys</Text>
          <Pressable onPress={() => router.push('/(tabs)/history')}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        {RECENT_SURVEYS.map((item) => (
          <SurveyItem key={item.id} item={item} />
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  scroll: { flex: 1 },
  content: {
    padding: 14,
    paddingTop: 16,
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.lg,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.1,
  },
  cardSub: {
    fontSize: 12,
    color: '#94A3B8',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#EAECF0',
  },

  // Completion
  completionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 14,
  },
  completionSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 6,
  },
  completionPct: {
    fontSize: 26,
    fontWeight: '800',
    color: ACCENT,
    letterSpacing: -1,
    width: 58,
    textAlign: 'right',
  },
  breakdownList: {
    marginTop: 14,
    gap: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  breakdownLabel: {
    fontSize: 12,
    color: '#64748B',
    width: 72,
    fontWeight: '500',
  },
  breakdownCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    width: 20,
    textAlign: 'right',
  },

  // Activity strip
  activityStrip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stripTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  stripSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  stripBadge: {
    fontSize: 22,
  },

  // Actions
  section: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    marginTop: 4,
    letterSpacing: 0.1,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 8,
  },
  seeAll: {
    fontSize: 13,
    color: ACCENT,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
  },
});