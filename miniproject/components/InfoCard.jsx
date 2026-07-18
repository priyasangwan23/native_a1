import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function InfoCard({ title, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 16,
    marginVertical: 12,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    color: COLORS.subtext,
    fontSize: 13,
  },
  value: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 5,
  },
});