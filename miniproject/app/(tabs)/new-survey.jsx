import { 
  View, Text, TextInput, StyleSheet, 
  Pressable, Alert, ScrollView 
} from 'react-native';
import { useState } from 'react';
import { COLORS } from '../../constants/theme';

export default function NewSurvey() {

  const [siteName, setSiteName] = useState('');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});

  // Validation Function
  const validate = () => {
    let newErrors = {};

    if (!siteName) newErrors.siteName = 'Site name is required';
    if (!clientName) newErrors.clientName = 'Client name is required';
    if (!priority) newErrors.priority = 'Select priority';
    if (!date) newErrors.date = 'Date is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = () => {
    if (!validate()) return;

    Alert.alert('Success', 'Survey Created Successfully');

    // reset form
    setSiteName('');
    setClientName('');
    setDescription('');
    setPriority('');
    setDate('');
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Create New Survey</Text>

      {/* Site Name */}
      <TextInput
        placeholder="Site Name"
        value={siteName}
        onChangeText={setSiteName}
        style={styles.input}
      />
      {errors.siteName && <Text style={styles.error}>{errors.siteName}</Text>}

      {/* Client Name */}
      <TextInput
        placeholder="Client Name"
        value={clientName}
        onChangeText={setClientName}
        style={styles.input}
      />
      {errors.clientName && <Text style={styles.error}>{errors.clientName}</Text>}

      {/* Description */}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      {/* Priority */}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.row}>
        {['Low', 'Medium', 'High'].map((item) => (
          <Pressable
            key={item}
            onPress={() => setPriority(item)}
            style={[
              styles.priorityBtn,
              priority === item && styles.selected
            ]}
          >
            <Text style={{
              color: priority === item ? '#fff' : COLORS.text
            }}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      {errors.priority && <Text style={styles.error}>{errors.priority}</Text>}

      {/* Date */}
      <TextInput
        placeholder="Enter Date (e.g. 18-07-2026)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      {errors.date && <Text style={styles.error}>{errors.date}</Text>}

      {/* Submit Button */}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Survey</Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: COLORS.text,
  },
  input: {
    backgroundColor: '#cdd6f3',
    textColor: '#5149e3',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  label: {
    marginTop: 15,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  priorityBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginRight: 10,
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});