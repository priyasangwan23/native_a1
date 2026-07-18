import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header({ title = "Dashboard" }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* Hamburger */}
      <Pressable onPress={() => navigation.toggleDrawer()}>
        <Text style={styles.menu}>☰</Text>
      </Pressable>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    color: '#fff',
    fontSize: 22,
    marginRight: 15,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});