/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';


/**
 * Todo List with Form
 * - Form fields: title (required) and description (optional)
 * - Add, toggle complete, edit (modal), delete
 * - No external packages required
 */

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: '1',
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, and fruit',
      done: false,
    },
    {
      id: '2',
      title: 'Read chapter 4',
      description: 'Finish reading and take notes',
      done: true,
    },
    {
      id: '3',
      title: 'Walk the dog',
      description: '30 minute walk in the evening',
      done: false,
    },
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(null); // { id, title, description }
  const [error, setError] = useState('');

  function clearForm() {
    setTitle('');
    setDescription('');
    setError('');
  }

  function addTodo() {
    const t = title.trim();
    if (!t) {
      setError('Title is required');
      return;
    }
    const newTodo = {
      id: Date.now().toString(),
      title: t,
      description: description.trim(),
      done: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    clearForm();
  }

  function toggleTodo(id) {
    setTodos((t) => t.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  }

  function deleteTodo(id) {
    setTodos((t) => t.filter((item) => item.id !== id));
  }

  function startEdit(item) {
    setEditing({ ...item });
  }

  function saveEdit() {
    if (!editing) return;
    const t = editing.title?.trim();
    if (!t) {
      // require title in edit too
      return;
    }
    setTodos((prev) => prev.map((it) => (it.id === editing.id ? { ...it, title: t, description: editing.description?.trim() } : it)));
    setEditing(null);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Todo List</Text>
        </View>

        {/* Form: title (required) + description (optional) */}
        <View style={styles.form}>
          <TextInput
            placeholder="Title (required)"
            value={title}
            onChangeText={(v) => {
              setTitle(v);
              if (error && v.trim()) setError('');
            }}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.descriptionInput]}
            placeholderTextColor="#888"
            multiline
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {/* Styled button so we can change color depending on inputs */}
          {(() => {
            const titleFilled = title.trim().length > 0;
            const descFilled = description.trim().length > 0;
            const bgColor = titleFilled && descFilled ? styles.addButtonBothFilled : titleFilled ? styles.addButtonFilled : styles.addButtonDisabled;
            return (
              <Pressable
                onPress={titleFilled ? addTodo : undefined}
                style={[styles.addButton, bgColor]}
                accessibilityState={{ disabled: !titleFilled }}
              >
                <Text style={[styles.addButtonText, !titleFilled && styles.addButtonTextDisabled]}>Add Todo</Text>
              </Pressable>
            );
          })()}
        </View>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No todos yet — add one above.</Text>}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Pressable
                onPress={() => toggleTodo(item.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: !!item.done }}
                style={[styles.checkbox, item.done && styles.checkboxChecked]}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                {item.done ? <Text style={styles.checkboxMark}>✓</Text> : null}
              </Pressable>

              <TouchableOpacity onPress={() => toggleTodo(item.id)} style={styles.itemTextWrap}>
                <Text style={[styles.itemTitle, item.done && styles.doneText]}>{item.title}</Text>
                {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
              </TouchableOpacity>

              <View style={styles.buttonsRow}>
                <Pressable onPress={() => startEdit(item)} style={styles.smallButton}>
                  <Text style={styles.smallButtonText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deleteTodo(item.id)} style={[styles.smallButton, styles.deleteButton]}>
                  <Text style={[styles.smallButtonText, styles.deleteText]}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />

        {/* Edit modal */}
        <Modal visible={!!editing} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Todo</Text>
              <Text style={styles.inputDescription}>Title</Text>
              <TextInput
                placeholder="Title (required)"
                value={editing?.title ?? ''}
                onChangeText={(t) => setEditing((e) => (e ? { ...e, title: t } : e))}
                style={styles.input}
                placeholderTextColor="#888"
              />
              <TextInput
                placeholder="Description (optional)"
                value={editing?.description ?? ''}
                onChangeText={(t) => setEditing((e) => (e ? { ...e, description: t } : e))}
                style={[styles.input, styles.descriptionInput]}
                placeholderTextColor="#888"
                multiline
              />
              <View style={styles.modalButtons}>
                {(() => {
                  const editingTitleFilled = (editing?.title ?? '').trim().length > 0;
                  return (
                    <Pressable
                      onPress={editingTitleFilled ? saveEdit : undefined}
                      style={[styles.addButton, editingTitleFilled ? styles.addButtonFilled : styles.addButtonDisabled]}
                      accessibilityState={{ disabled: !editingTitleFilled }}
                    >
                      <Text style={[styles.addButtonText, !editingTitleFilled && styles.addButtonTextDisabled]}>Save</Text>
                    </Pressable>
                  );
                })()}
                <Pressable onPress={() => setEditing(null)} style={[styles.smallButton, { marginLeft: 8 }]}>
                  <Text style={[styles.smallButtonText]}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  header: { alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '700' },
  form: { marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  descriptionInput: { minHeight: 40 },
  error: { color: '#c00', marginBottom: 8 },
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
  checkboxChecked: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  checkboxMark: { color: '#fff', fontWeight: '700' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  modalContent: { width: '90%', backgroundColor: '#fff', padding: 16, borderRadius: 8 },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  inputDescription: { fontSize: 12, fontWeight: '600', marginBottom: 8 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  addButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  addButtonFilled: {
    backgroundColor: '#28a745',
  },
  addButtonBothFilled: {
    backgroundColor: '#007bff',
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: { color: '#fff', fontWeight: '700' },
  addButtonTextDisabled: { color: '#666' },
});
