import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
import ActionCard from '../../components/ActionCard';
import SurveyItem from '../../components/SurveyItem';
import { COLORS } from '../../constants/theme';

export default function Dashboard() {

  const surveys = [
    { id: '1', site: 'Site A', client: 'Client X' },
    { id: '2', site: 'Site B', client: 'Client Y' },
  ];

  return (
    <View style={styles.container}>

      <Header />

      <View style={styles.content}>

        <InfoCard title="Today's Surveys" value="5" />

        <Text style={styles.section}>Quick Actions</Text>

        <View style={styles.row}>
          <ActionCard title="New Survey" />
          <ActionCard title="Camera" />
        </View>

        <View style={styles.row}>
          <ActionCard title="Location" />
          <ActionCard title="Contacts" />
        </View>

        <Text style={styles.section}>Recent Surveys</Text>

        <FlatList
          data={surveys}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SurveyItem item={item} />}
          showsVerticalScrollIndicator={false}
        />

      </View>
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
    marginTop: -20, 
  },
  section: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 6,
    color: COLORS.text,
  },
  row: {
    flexDirection: 'row',
  },
});