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
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { RADIUS } from '../constants/theme';

const ACCENT = '#070355';

export default function ContactsScreen() {
  const [contacts, setContacts]   = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [search, setSearch]       = useState('');
  const [loading, setLoading]     = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => { getContacts(); }, []);

  const handleSearch = (text) => {
    setSearch(text);
    setFiltered(contacts.filter((item) =>
      item.name?.toLowerCase().includes(text.toLowerCase())
    ));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getContacts();
    setRefreshing(false);
  };

  const copyNumber = async (number) => {
    if (!number) { Alert.alert('No Number Available'); return; }
    await Clipboard.setStringAsync(number);
    Alert.alert('Copied', 'Number copied to clipboard');
  };

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  const renderItem = ({ item }) => {
    const number = item.phoneNumbers?.[0]?.number;

    return (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
        onPress={() => copyNumber(number)}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitial(item.name)}</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.number}>{number || 'No Number'}</Text>
        </View>

        <View style={styles.copyIcon}>
          <Ionicons name="copy-outline" size={16} color="#94A3B8" />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Contacts" />

      {/* Search Bar */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#64748B" style={styles.searchIcon} />
        <TextInput
          placeholder="Search contacts..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={handleSearch}
          style={styles.search}
        />
        {search.length > 0 && (
          <Pressable onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={18} color="#64748B" />
          </Pressable>
        )}
      </View>

      {/* Count Badge */}
      <View style={styles.countWrap}>
        <View style={styles.countBadge}>
          <Ionicons name="people-outline" size={14} color={ACCENT} />
          <Text style={styles.countText}>{filtered.length} Contacts</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={ACCENT} />
          <Text style={styles.loadingText}>Loading Contacts...</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="person-outline" size={44} color="#94A3B8" />
          <Text style={styles.emptyTitle}>No Contacts Found</Text>
          <Text style={styles.emptySubtitle}>Try a different search term</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={ACCENT}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 14,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  searchIcon: {
    marginRight: 8,
  },
  search: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  countWrap: {
    paddingHorizontal: 14,
    marginBottom: 4,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: ACCENT + '0D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  countText: {
    color: ACCENT,
    fontWeight: '700',
    fontSize: 12,
  },
  list: {
    padding: 14,
    paddingTop: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: ACCENT + '0D',
  },
  avatarText: {
    color: ACCENT,
    fontSize: 18,
    fontWeight: '800',
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  number: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  copyIcon: {
    padding: 6,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loadingText: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 10,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
});