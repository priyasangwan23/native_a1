import {
  View, Text, TextInput, StyleSheet,
  Pressable, Alert, ScrollView
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { COLORS, RADIUS, SHADOWS } from '../../constants/theme';
import { useSurveyStore, updateSurveyField } from '../../constants/store';

const ACCENT = '#070355';

const PRIORITY_CONFIG = [
  { label: 'Low',    icon: 'arrow-down-circle-outline', color: '#10B981' },
  { label: 'Medium', icon: 'remove-circle-outline',     color: '#F59E0B' },
  { label: 'High',   icon: 'arrow-up-circle-outline',   color: '#EF4444' },
];

export default function NewSurvey() {
  const store = useSurveyStore();
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!store.siteName)    newErrors.siteName    = 'Site name is required';
    if (!store.clientName)  newErrors.clientName  = 'Client name is required';
    if (!store.priority)    newErrors.priority    = 'Select a priority';
    if (!store.date)        newErrors.date        = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    router.push('/(tabs)/preview');
  };

  const InputField = ({ icon, placeholder, value, onChangeText, multiline, errorKey }) => (
    <View style={{ marginBottom: 4 }}>
      <View style={[styles.inputWrap, errors[errorKey] && styles.inputError]}>
        <Ionicons name={icon} size={18} color="#64748B" style={styles.inputIcon} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, multiline && styles.multiline]}
          multiline={multiline}
        />
      </View>
      {errors[errorKey] && (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle-outline" size={13} color="#EF4444" />
          <Text style={styles.error}> {errors[errorKey]}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="New Survey" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Card wrapper */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Survey Details</Text>

          <InputField
            icon="business-outline"
            placeholder="Site Name"
            value={store.siteName}
            onChangeText={(text) => updateSurveyField('siteName', text)}
            errorKey="siteName"
          />
          <InputField
            icon="person-outline"
            placeholder="Client Name"
            value={store.clientName}
            onChangeText={(text) => updateSurveyField('clientName', text)}
            errorKey="clientName"
          />
          <InputField
            icon="document-text-outline"
            placeholder="Description (optional)"
            value={store.description}
            onChangeText={(text) => updateSurveyField('description', text)}
            multiline
          />
          <InputField
            icon="calendar-outline"
            placeholder="Date  (e.g. 18-07-2026)"
            value={store.date}
            onChangeText={(text) => updateSurveyField('date', text)}
            errorKey="date"
          />
        </View>

        {/* Priority Selector */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Priority Level</Text>
          <View style={styles.priorityRow}>
            {PRIORITY_CONFIG.map((item) => {
              const isSelected = store.priority === item.label;
              return (
                <Pressable
                  key={item.label}
                  onPress={() => updateSurveyField('priority', item.label)}
                  style={({ pressed }) => [
                    styles.priorityBtn,
                    isSelected && { backgroundColor: ACCENT, borderColor: ACCENT },
                    pressed && { opacity: 0.85 },
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={isSelected ? '#fff' : '#94A3B8'}
                  />
                  <Text style={[
                    styles.priorityLabel,
                    { color: isSelected ? '#fff' : '#64748B' },
                  ]}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>
          {errors.priority && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={13} color="#EF4444" />
              <Text style={styles.error}> {errors.priority}</Text>
            </View>
          )}
        </View>

        {/* Submit */}
        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [styles.submitBtn, pressed && { opacity: 0.85 }]}
        >
          <Ionicons name="eye-outline" size={20} color="#fff" />
          <Text style={styles.submitText}>Preview Survey</Text>
        </Pressable>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
    paddingTop: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginBottom: 16,
    ...SHADOWS.md,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.text,
  },
  multiline: {
    height: 90,
    textAlignVertical: 'top',
    paddingTop: 13,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: -6,
  },
  error: {
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: '500',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityBtn: {
    flex: 1,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F8F9FB',
    borderWidth: 1.5,
    borderColor: '#EAECF0',
  },
  priorityLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    gap: 8,
    backgroundColor: ACCENT,
  },
  submitText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.3,
  },
});