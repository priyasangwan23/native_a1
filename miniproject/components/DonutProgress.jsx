/**
 * DonutProgress — draws a circular progress ring using borders.
 * Props:
 *   percent: number (0–100)
 *   size: number
 *   color: string
 *   label: string
 *   subtitle: string
 */
import { View, Text, StyleSheet } from 'react-native';

export default function DonutProgress({
  percent = 0,
  size = 100,
  color = '#070355',
  label = '',
  subtitle = '',
}) {
  // Clamp
  const pct = Math.min(100, Math.max(0, percent));
  const strokeWidth = size * 0.12;
  const radius = (size - strokeWidth) / 2;

  // We simulate a ring using two half-circles clipped with overflow:hidden
  // left half covers 0–180deg, right half covers 180–360deg
  const deg = (pct / 100) * 360;

  // Determine which halves to show
  const rightDeg = Math.min(deg, 180);          // 0–180
  const leftDeg  = Math.max(0, deg - 180);      // 0–180

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    position: 'relative',
    backgroundColor: 'transparent',
  };

  // Track ring
  const trackStyle = {
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: strokeWidth,
    borderColor: color + '18',
  };

  // We use a simpler approach: just a thick bordered circle with a
  // conic-gradient-like feel achieved via two rotated half-circles.
  // For RN compatibility: use a border-trick with two View halves.

  return (
    <View style={styles.wrapper}>
      {/* Outer ring track */}
      <View style={[trackStyle]} />

      {/* Right half (first 180°) */}
      <View style={[styles.halfCircleContainer, { width: size / 2, height: size }]}>
        <View
          style={[
            styles.halfCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: color,
              transform: [{ rotate: `${rightDeg - 180}deg` }],
            },
          ]}
        />
      </View>

      {/* Left half (next 180°) — only visible if deg > 180 */}
      {deg > 180 && (
        <View style={[styles.halfCircleContainer, styles.leftHalf, { width: size / 2, height: size }]}>
          <View
            style={[
              styles.halfCircle,
              styles.halfCircleLeft,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: color,
                transform: [{ rotate: `${leftDeg}deg` }],
              },
            ]}
          />
        </View>
      )}

      {/* Center label */}
      <View style={[styles.center, { width: size, height: size }]}>
        <Text style={[styles.pctText, { fontSize: size * 0.22, color }]}>{pct}%</Text>
        {label ? <Text style={[styles.label, { fontSize: size * 0.11 }]}>{label}</Text> : null}
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  halfCircleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  leftHalf: {
    left: 'auto',
    right: 0,
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  halfCircleLeft: {
    left: 'auto',
    right: 0,
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pctText: {
    fontWeight: '800',
    letterSpacing: -1,
  },
  label: {
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
