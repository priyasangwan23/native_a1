import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function ActionCard({ title, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    margin: 6,
    borderRadius: 14,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});