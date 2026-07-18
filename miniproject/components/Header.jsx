import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Survey & Inspection App</Text>
      <Text style={styles.subtitle}>Welcome back, Priya</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#E0E7FF',
    marginTop: 4,
  },
});