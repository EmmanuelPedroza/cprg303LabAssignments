import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LabHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CPRG-303-B</Text>
      <View style={styles.separator}></View>
      <TouchableOpacity style={styles.labItem} onPress={() => navigation.navigate('Lab-One')}>
        <Text style={styles.labText}>Lab One</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.labItem} onPress={() => navigation.navigate('Lab-Two')}>
        <Text style={styles.labText}>Lab Two</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  separator: { borderColor: '#000000ff', borderWidth: 1, width: '100%', marginBottom: 20 },
  labItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  labText: { fontSize: 18, color: '#007bff', fontWeight: '600' },
});

export default LabHome;