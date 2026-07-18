import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import Header from '../components/Header';

export default function ClipboardScreen() {
  const [notes, setNotes] = useState('');
  const [pastedText, setPastedText] = useState('');

  //  Copy functions
  const copySurveyId = async () => {
    await Clipboard.setStringAsync('SURVEY-12345');
    Alert.alert('Copied', 'Survey ID copied');
  };

  const copyContact = async () => {
    await Clipboard.setStringAsync('+91 9876543210');
    Alert.alert('Copied', 'Contact number copied');
  };

  const copyLocation = async () => {
    await Clipboard.setStringAsync('Lat: 23.0225, Lng: 72.5714');
    Alert.alert('Copied', 'Location copied');
  };

  //  Paste
  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setPastedText(text);
  };

  //  Clear
  const clearClipboard = async () => {
    await Clipboard.setStringAsync('');
    setPastedText('');
    setNotes('');
    Alert.alert('Cleared', 'Clipboard cleared');
  };

  return (
    <View style={styles.container}>
      <Header title="Clipboard" />

      <View style={styles.content}>
        
        {/* COPY BUTTONS */}
        <Pressable style={styles.button} onPress={copySurveyId}>
          <Text style={styles.text}>Copy Survey ID</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={copyContact}>
          <Text style={styles.text}>Copy Contact Number</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={copyLocation}>
          <Text style={styles.text}>Copy Location</Text>
        </Pressable>

        {/* NOTES INPUT */}
        <Text style={styles.label}>Paste Notes</Text>

        <TextInput
          placeholder="Write or paste notes..."
          value={notes}
          onChangeText={setNotes}
          style={styles.input}
          multiline
        />

        {/* PASTE BUTTON */}
        <Pressable style={styles.button} onPress={pasteFromClipboard}>
          <Text style={styles.text}>Paste from Clipboard</Text>
        </Pressable>

        {/* DISPLAY PASTED */}
        {pastedText ? (
          <Text style={styles.pasteText}>
            Pasted: {pastedText}
          </Text>
        ) : null}

        {/* CLEAR BUTTON */}
        <Pressable style={styles.clearBtn} onPress={clearClipboard}>
          <Text style={styles.text}>Clear Clipboard</Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  content: {
    padding: 15,
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },

  clearBtn: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontWeight: '600',
  },

  label: {
    marginTop: 10,
    fontWeight: '600',
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    minHeight: 80,
  },

  pasteText: {
    marginTop: 10,
    fontStyle: 'italic',
  },
});