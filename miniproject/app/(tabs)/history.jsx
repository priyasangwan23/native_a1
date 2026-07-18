import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Alert,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { RADIUS } from '../../constants/theme';
import { useSurveyStore, deleteSurveyFromHistory } from '../../constants/store';

const ACCENT = '#070355';

export default function HistoryScreen() {
  const store = useSurveyStore();
  const historyList = store.history || [];

  const [search, setSearch] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredHistory = historyList.filter((item) => {
    const matchesSearch =
      item.siteName?.toLowerCase().includes(search.toLowerCase()) ||
      item.clientName?.toLowerCase().includes(search.toLowerCase());
    const matchesPriority =
      selectedPriority === 'All' ||
      item.priority?.toLowerCase() === selectedPriority.toLowerCase();
    return matchesSearch && matchesPriority;
  });

  const handleDelete = (item) => {
    Alert.alert(
      'Delete Survey',
      `Are you sure you want to permanently delete the survey for "${item.siteName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteSurveyFromHistory(item.id),
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

  const renderSurveyItem = ({ item }) => {
    const priorityColor = getPriorityColor(item.priority);

    return (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
        onPress={() => {
          setSelectedSurvey(item);
          setModalVisible(true);
        }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '15' }]}>
              <View style={[styles.priorityDot, { backgroundColor: priorityColor }]} />
              <Text style={[styles.priorityText, { color: priorityColor }]}>
                {item.priority}
              </Text>
            </View>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>

          <Pressable
            onPress={() => handleDelete(item)}
            style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.7 }]}
          >
            <Ionicons name="trash-outline" size={16} color="#EF4444" />
          </Pressable>
        </View>

        <Text style={styles.siteName}>{item.siteName}</Text>
        <Text style={styles.clientName}>Client: {item.clientName}</Text>

        <View style={styles.cardFooter}>
          <View style={styles.footerItem}>
            <Ionicons name="navigate-outline" size={13} color="#64748B" />
            <Text style={styles.footerText} numberOfLines={1}>
              {item.location ? 'Geotagged' : 'No Location'}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <Ionicons name="camera-outline" size={13} color="#64748B" />
            <Text style={styles.footerText}>
              {item.photo ? 'Photo Attached' : 'No Photo'}
            </Text>
          </View>
        </View>
      </Pressable>
    );
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
      <Header title="Survey History" />

      {/* Search Input */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#64748B" style={styles.searchIcon} />
        <TextInput
          placeholder="Search by site or client..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color="#64748B" />
          </Pressable>
        )}
      </View>

      {/* Priority Filters */}
      <View style={styles.filterWrap}>
        {['All', 'High', 'Medium', 'Low'].map((prio) => {
          const isSelected = selectedPriority === prio;
          return (
            <Pressable
              key={prio}
              onPress={() => setSelectedPriority(prio)}
              style={[
                styles.filterPill,
                isSelected && { backgroundColor: ACCENT, borderColor: ACCENT },
              ]}
            >
              <Text style={[styles.filterText, isSelected && { color: '#fff' }]}>
                {prio}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Survey List */}
      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderSurveyItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="document-text-outline" size={44} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No Surveys Found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search or filters</Text>
          </View>
        }
      />

      {/* Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Survey Details</Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.7 }]}
              >
                <Ionicons name="close-outline" size={24} color="#0F172A" />
              </Pressable>
            </View>

            {selectedSurvey && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalBody}>
                {/* Basic details card */}
                <View style={styles.detailCard}>
                  <DetailRow icon="business-outline" label="Site Name" value={selectedSurvey.siteName} />
                  <DetailRow icon="person-outline" label="Client Name" value={selectedSurvey.clientName} />
                  <DetailRow icon="calendar-outline" label="Date" value={selectedSurvey.date} />
                  <DetailRow 
                    icon="flag-outline" 
                    label="Priority" 
                    value={selectedSurvey.priority} 
                    color={getPriorityColor(selectedSurvey.priority)}
                  />
                  {selectedSurvey.description ? (
                    <DetailRow icon="chatbubble-outline" label="Description" value={selectedSurvey.description} />
                  ) : null}
                </View>

                {/* Photo details */}
                <View style={styles.detailCard}>
                  <Text style={styles.detailCardTitle}>Photo Attachment</Text>
                  {selectedSurvey.photo ? (
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: selectedSurvey.photo }} style={styles.image} />
                    </View>
                  ) : (
                    <Text style={styles.noDataText}>No photo attached to this survey.</Text>
                  )}
                </View>

                {/* Location details */}
                <View style={styles.detailCard}>
                  <Text style={styles.detailCardTitle}>Location Details</Text>
                  {selectedSurvey.location ? (
                    <DetailRow icon="navigate-outline" label="Coordinates & Address" value={selectedSurvey.location} />
                  ) : (
                    <Text style={styles.noDataText}>No location captured.</Text>
                  )}
                </View>

                {/* Contact representative */}
                <View style={styles.detailCard}>
                  <Text style={styles.detailCardTitle}>Contact Person</Text>
                  {selectedSurvey.contact ? (
                    <DetailRow icon="person-circle-outline" label="Representative" value={selectedSurvey.contact} />
                  ) : (
                    <Text style={styles.noDataText}>No representative details selected.</Text>
                  )}
                </View>

                {/* Notes */}
                <View style={styles.detailCard}>
                  <Text style={styles.detailCardTitle}>Field Notes</Text>
                  {selectedSurvey.notes ? (
                    <View style={styles.notesContainer}>
                      <Text style={styles.notesText}>{selectedSurvey.notes}</Text>
                    </View>
                  ) : (
                    <Text style={styles.noDataText}>No notes written.</Text>
                  )}
                </View>

                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={({ pressed }) => [styles.doneBtn, pressed && { opacity: 0.85 }]}
                >
                  <Text style={styles.doneBtnText}>Close details</Text>
                </Pressable>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
    margin: 16,
    marginBottom: 8,
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
  filterWrap: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  list: {
    padding: 16,
    paddingTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  dateText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  deleteBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#EF444410',
  },
  siteName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  clientName: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#EAECF0',
    paddingTop: 10,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 8,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    maxHeight: '85%',
    minHeight: '60%',
    padding: 20,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
    paddingBottom: 12,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
  },
  modalBody: {
    gap: 16,
    paddingBottom: 30,
  },
  detailCard: {
    backgroundColor: '#F8F9FB',
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EAECF0',
    gap: 12,
  },
  detailCardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EAECF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 9,
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
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  noDataText: {
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  notesContainer: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#070355',
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  notesText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  doneBtn: {
    backgroundColor: '#070355',
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  doneBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});