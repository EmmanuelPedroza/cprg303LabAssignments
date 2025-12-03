import React from 'react';
import { View, Text, FlatList, Pressable, TouchableOpacity, StyleSheet } from 'react-native';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.empty}>No todos yet — add one above.</Text>}
      renderItem={({ item }) => (
        <View style={styles.itemRow}>
          <Pressable
            onPress={() => onToggle(item.id)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: !!item.done }}
            style={[styles.checkbox, item.done && styles.checkboxChecked]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {item.done ? <Text style={styles.checkboxMark}>✓</Text> : null}
          </Pressable>
          <TouchableOpacity onPress={() => onToggle(item.id)} style={styles.itemTextWrap}>
            <Text style={[styles.itemTitle, item.done && styles.doneText]}>{item.title}</Text>
            {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
          </TouchableOpacity>
          <View style={styles.buttonsRow}>
            <Pressable onPress={() => onEdit(item)} style={styles.smallButton}>
              <Text style={styles.smallButtonText}>Edit</Text>
            </Pressable>
            <Pressable onPress={() => onDelete(item.id)} style={[styles.smallButton, styles.deleteButton]}>
              <Text style={[styles.smallButtonText, styles.deleteText]}>Delete</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: { paddingBottom: 40 },
  empty: { textAlign: 'center', color: '#666', marginTop: 20 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemTextWrap: { flex: 1, marginRight: 12 },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemDesc: { color: '#666', marginTop: 4 },
  doneText: { textDecorationLine: 'line-through', color: '#999' },
  buttonsRow: { flexDirection: 'row' },
  smallButton: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, backgroundColor: '#eee', marginLeft: 6 },
  smallButtonText: { color: '#333' },
  deleteButton: { backgroundColor: '#ffecec' },
  deleteText: { color: '#c00' },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: { backgroundColor: '#4caf50', borderColor: '#4caf50' },
  checkboxMark: { color: '#fff', fontWeight: '700' },
});

export default TodoList;
