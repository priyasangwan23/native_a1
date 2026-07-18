/**
 * WeeklyBarChart — pure View-based bar chart, no external library.
 * Props:
 *   data: [{ label: 'Mon', value: 3 }]
 *   accentColor: string
 */
import { View, Text, StyleSheet } from 'react-native';

export default function WeeklyBarChart({ data = [], accentColor = '#070355' }) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);

  return (
    <View style={styles.wrapper}>
      {/* Y-axis label */}
      <View style={styles.yAxis}>
        {[maxVal, Math.round(maxVal / 2), 0].map((v) => (
          <Text key={v} style={styles.yLabel}>{v}</Text>
        ))}
      </View>

      {/* Bars */}
      <View style={styles.chartArea}>
        {/* Horizontal guide lines */}
        <View style={[styles.guideLine, { bottom: '100%' }]} />
        <View style={[styles.guideLine, { bottom: '50%' }]} />
        <View style={[styles.guideLine, { bottom: 0 }]} />

        {/* Bar columns */}
        <View style={styles.barsRow}>
          {data.map((item) => {
            const heightPercent = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
            const isToday = item.today;
            return (
              <View key={item.label} style={styles.barCol}>
                <Text style={styles.barValue}>{item.value}</Text>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${heightPercent}%`,
                        backgroundColor: isToday ? accentColor : accentColor + '35',
                        borderRadius: 5,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.barLabel, isToday && { color: accentColor, fontWeight: '700' }]}>
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 130,
    marginTop: 8,
  },
  yAxis: {
    width: 22,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 20,
    paddingTop: 2,
    marginRight: 6,
  },
  yLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  guideLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  barsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
  },
  barValue: {
    fontSize: 9,
    color: '#94A3B8',
    marginBottom: 3,
  },
  barTrack: {
    width: '50%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    minHeight: 4,
  },
  barLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 5,
    fontWeight: '500',
  },
});
