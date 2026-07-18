import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { RADIUS } from '../constants/theme';

const ACCENT = '#070355';

const COPY_ITEMS = [
  {
    label: 'Survey ID',
    value: 'SURVEY-12345',
    icon: 'document-text-outline',
  },
  {
    label: 'Contact Number',
    value: '+91 9876543210',
    icon: 'call-outline',
  },
  {
    label: 'Location',
    value: 'Lat: 23.0225, Lng: 72.5714',
    icon: 'location-outline',
  },
];

export default function ClipboardScreen() {
  const [notes, setNotes]           = useState('');
  const [pastedText, setPastedText] = useState('');

  const copyItem = async (item) => {
    await Clipboard.setStringAsync(item.value);
    Alert.alert('Copied ✓', `${item.label} copied to clipboard`);
  };

  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setPastedText(text);
  };

  const clearClipboard = async () => {
    await Clipboard.setStringAsync('');
    setPastedText('');
    setNotes('');
    Alert.alert('Cleared', 'Clipboard cleared');
  };

  return (
    <View style={styles.container}>
      <Header title="Clipboard" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Quick Copy Section */}
        <Text style={styles.section}>Quick Copy</Text>
        <View style={styles.card}>
          {COPY_ITEMS.map((item, index) => (
            <Pressable
              key={item.label}
              onPress={() => copyItem(item)}
              style={({ pressed }) => [
                styles.copyRow,
                index < COPY_ITEMS.length - 1 && styles.copyRowBorder,
                pressed && { backgroundColor: '#F8F9FB' },
              ]}
            >
              <View style={styles.copyIcon}>
                <Ionicons name={item.icon} size={18} color={ACCENT} />
              </View>
              <View style={styles.copyContent}>
                <Text style={styles.copyLabel}>{item.label}</Text>
                <Text style={styles.copyValue} numberOfLines={1}>{item.value}</Text>
              </View>
              <Ionicons name="copy-outline" size={16} color="#CBD5E1" />
            </Pressable>
          ))}
        </View>

        {/* Notes Section */}
        <Text style={styles.section}>Notes</Text>
        <View style={styles.card}>
          <View style={styles.textareaWrap}>
            <TextInput
              placeholder="Write or paste notes here..."
              placeholderTextColor="#94A3B8"
              value={notes}
              onChangeText={setNotes}
              style={styles.textarea}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.noteBtnRow}>
            <Pressable
              onPress={pasteFromClipboard}
              style={({ pressed }) => [styles.noteBtn, { backgroundColor: ACCENT, marginRight: 6 }, pressed && { opacity: 0.8 }]}
            >
              <Ionicons name="clipboard-outline" size={16} color="#fff" />
              <Text style={styles.noteBtnText}>Paste</Text>
            </Pressable>

            <Pressable
              onPress={clearClipboard}
              style={({ pressed }) => [styles.noteBtn, { backgroundColor: '#EF4444', marginLeft: 6 }, pressed && { opacity: 0.8 }]}
            >
              <Ionicons name="trash-outline" size={16} color="#fff" />
              <Text style={styles.noteBtnText}>Clear</Text>
            </Pressable>
          </View>
        </View>

        {/* Pasted Result */}
        {pastedText ? (
          <View style={styles.pastedCard}>
            <View style={styles.pastedHeader}>
              <Ionicons name="checkmark-circle-outline" size={14} color="#10B981" />
              <Text style={styles.pastedTitle}>Pasted Content</Text>
            </View>
            <Text style={styles.pastedText}>{pastedText}</Text>
          </View>
        ) : null}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  content: {
    padding: 16,
    paddingTop: 16,
  },
  section: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  copyRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
  },
  copyIcon: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ACCENT + '0D',
  },
  copyContent: {
    flex: 1,
  },
  copyLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  copyValue: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  textareaWrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
    padding: 14,
  },
  textarea: {
    minHeight: 90,
    fontSize: 14,
    color: '#0F172A',
    lineHeight: 20,
  },
  noteBtnRow: {
    flexDirection: 'row',
    padding: 14,
  },
  noteBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
  },
  noteBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  pastedCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: RADIUS.md,
    padding: 16,
    borderWidth: 1,
    borderColor: '#10B98130',
    marginBottom: 10,
  },
  pastedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  pastedTitle: {
    fontWeight: '700',
    color: '#10B981',
    fontSize: 12,
  },
  pastedText: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
});