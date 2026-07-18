import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { useSurveyStore, resetSurveyData } from '../../constants/store';
import Header from '../../components/Header';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../../constants/theme';

export default function PreviewScreen() {
  const router = useRouter();
  const store = useSurveyStore();

  const handleSubmit = () => {
    if (!store.siteName || !store.clientName || !store.priority || !store.date) {
      Alert.alert('Incomplete Survey', 'Please fill out basic survey details before submitting.');
      router.push('/(tabs)/new-survey');
      return;
    }

    Alert.alert(
      'Submit Survey',
      'Are you sure you want to submit this survey data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            Alert.alert('Success ✓', 'Survey submitted successfully!');
            resetSurveyData();
            router.push('/(tabs)/');
          },
        },
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#64748B';
    }
  };

  const DetailRow = ({ icon, label, value, color }) => (
    <View style={styles.detailRow}>
      <View style={[styles.detailIcon, color && { backgroundColor: color + '0D' }]}>
        <Ionicons name={icon} size={16} color={color || '#64748B'} />
      </View>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value || '—'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Survey Preview" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Details */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="document-text-outline" size={18} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Basic Details</Text>
          </View>
          <View style={styles.cardBody}>
            <DetailRow icon="business-outline" label="Site Name" value={store.siteName} />
            <DetailRow icon="person-outline" label="Client Name" value={store.clientName} />
            <DetailRow icon="calendar-outline" label="Date" value={store.date} />
            <DetailRow 
              icon="flag-outline" 
              label="Priority" 
              value={store.priority} 
              color={getPriorityColor(store.priority)}
            />
            {store.description ? (
              <DetailRow icon="chatbubble-outline" label="Description" value={store.description} />
            ) : null}
          </View>
        </View>

        {/* Photo Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="camera-outline" size={18} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Photo Attachment</Text>
          </View>
          <View style={styles.cardBody}>
            {store.photo ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: store.photo }} style={styles.image} />
                <View style={styles.imageBadge}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.imageBadgeText}>Captured</Text>
                </View>
              </View>
            ) : (
              <Pressable 
                style={({ pressed }) => [styles.placeholderContainer, pressed && { opacity: 0.8 }]}
                onPress={() => router.push('/camera')}
              >
                <Ionicons name="cloud-upload-outline" size={32} color="#94A3B8" />
                <Text style={styles.placeholderText}>No photo captured yet</Text>
                <Text style={styles.placeholderSubtext}>Tap to open camera</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Location Details */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={18} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Location Details</Text>
          </View>
          <View style={styles.cardBody}>
            {store.location ? (
              <DetailRow icon="navigate-outline" label="Geotagged Address" value={store.location} />
            ) : (
              <Pressable 
                style={({ pressed }) => [styles.placeholderContainer, pressed && { opacity: 0.8 }]}
                onPress={() => router.push('/location')}
              >
                <Ionicons name="location-outline" size={28} color="#94A3B8" />
                <Text style={styles.placeholderText}>No location data</Text>
                <Text style={styles.placeholderSubtext}>Tap to acquire coordinates</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="people-outline" size={18} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Contact Person</Text>
          </View>
          <View style={styles.cardBody}>
            {store.contact ? (
              <DetailRow icon="person-circle-outline" label="Selected Representative" value={store.contact} />
            ) : (
              <Pressable 
                style={({ pressed }) => [styles.placeholderContainer, pressed && { opacity: 0.8 }]}
                onPress={() => router.push('/contacts')}
              >
                <Ionicons name="person-add-outline" size={28} color="#94A3B8" />
                <Text style={styles.placeholderText}>No contact selected</Text>
                <Text style={styles.placeholderSubtext}>Tap to pick from contacts list</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Clipboard Notes */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="clipboard-outline" size={18} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Field Notes</Text>
          </View>
          <View style={styles.cardBody}>
            {store.notes ? (
              <View style={styles.notesContainer}>
                <Text style={styles.notesText}>{store.notes}</Text>
              </View>
            ) : (
              <Pressable 
                style={({ pressed }) => [styles.placeholderContainer, pressed && { opacity: 0.8 }]}
                onPress={() => router.push('/clipboard')}
              >
                <Ionicons name="create-outline" size={28} color="#94A3B8" />
                <Text style={styles.placeholderText}>No notes recorded</Text>
                <Text style={styles.placeholderSubtext}>Tap to write notes</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.btnRow}>
          <Pressable
            style={({ pressed }) => [styles.editBtn, pressed && { opacity: 0.8 }]}
            onPress={() => router.push('/(tabs)/new-survey')}
          >
            <Ionicons name="create-outline" size={18} color={COLORS.primary} />
            <Text style={styles.editBtnText}>Edit Details</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.submitBtn, pressed && { opacity: 0.85 }]}
            onPress={handleSubmit}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
            <Text style={styles.submitBtnText}>Submit Survey</Text>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
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
  card: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
    paddingBottom: 10,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.1,
  },
  cardBody: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailIcon: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  detailValue: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '700',
    marginTop: 1,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  imageBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
  },
  placeholderContainer: {
    borderWidth: 1.5,
    borderColor: '#EAECF0',
    borderStyle: 'dashed',
    borderRadius: RADIUS.md,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FB',
  },
  placeholderText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '700',
    marginTop: 8,
  },
  placeholderSubtext: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  notesContainer: {
    backgroundColor: '#F8F9FB',
    borderRadius: RADIUS.md,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#070355',
  },
  notesText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  editBtn: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  editBtnText: {
    color: '#070355',
    fontWeight: '700',
    fontSize: 14,
  },
  submitBtn: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    backgroundColor: '#070355',
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});