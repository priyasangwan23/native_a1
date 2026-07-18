import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';
import * as Clipboard from 'expo-clipboard';
import Header from '../components/Header';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 📞 Fetch Contacts
  const getContacts = async () => {
    setLoading(true);

    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied');
      setLoading(false);
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    setContacts(data);
    setFiltered(data);
    setLoading(false);
  };

  useEffect(() => {
    getContacts();
  }, []);

  // 🔍 Search
  const handleSearch = (text) => {
    setSearch(text);

    const filteredData = contacts.filter((item) =>
      item.name?.toLowerCase().includes(text.toLowerCase())
    );

    setFiltered(filteredData);
  };

  // 🔄 Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await getContacts();
    setRefreshing(false);
  };

  // 📋 Copy Number
  const copyNumber = async (number) => {
    if (!number) {
      Alert.alert('No Number Available');
      return;
    }

    await Clipboard.setStringAsync(number);
    Alert.alert('Copied', 'Number copied to clipboard');
  };

  // 👤 Avatar (Initial)
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // 📄 Render Item
  const renderItem = ({ item }) => {
    const number = item.phoneNumbers?.[0]?.number;

    return (
      <Pressable style={styles.card} onPress={() => copyNumber(number)}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitial(item.name)}</Text>
        </View>

        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.number}>
            {number || 'No Number'}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Contacts" />

      {/* 🔍 Search */}
      <TextInput
        placeholder="Search contacts..."
        value={search}
        onChangeText={handleSearch}
        style={styles.search}
      />

      {/* 📊 Count */}
      <Text style={styles.count}>
        Total Contacts: {filtered.length}
      </Text>

      {/* ⏳ Loading */}
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : filtered.length === 0 ? (
        // ❌ Empty State
        <View style={styles.center}>
          <Text>No Contacts Found</Text>
        </View>
      ) : (
        // 📋 List
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  search: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  count: {
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: '600',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  number: {
    color: 'gray',
    fontSize: 13,
  },

  center: {
    alignItems: 'center',
    marginTop: 40,
  },
});