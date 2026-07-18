import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function SurveyItem({ item }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.site}</Text>
      <Text style={styles.client}>{item.client}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 14,
    marginVertical: 6,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: COLORS.text,
  },
  client: {
    marginTop: 4,
    color: COLORS.subtext,
  },
});