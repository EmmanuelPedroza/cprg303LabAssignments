import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import EditModal from './components/EditModal';

const LabThree = ({ navigation }) => {
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
    // Added static data
    {
      id: '4',
      title: 'Do laundry',
      description: '',
      done: false,
    },
    {
      id: '5',
      title: 'Go to gym',
      description: '',
      done: false,
    },
    {
      id: '6',
      title: 'Walk dog',
      description: '',
      done: false,
    },
  ]);
  const [editing, setEditing] = useState(null);

  const addTodo = (newTodo) => setTodos((prev) => [newTodo, ...prev]);
  const toggleTodo = (id) => setTodos((t) => t.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  const deleteTodo = (id) => setTodos((t) => t.filter((item) => item.id !== id));
  const startEdit = (item) => setEditing({ ...item });
  const saveEdit = (updatedTodo) => {
    setTodos((prev) => prev.map((it) => (it.id === updatedTodo.id ? updatedTodo : it)));
    setEditing(null);
  };

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>&lt; Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Lab Three</Text>
        </View>
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={startEdit} />
        <EditModal editing={editing} onSave={saveEdit} onCancel={() => setEditing(null)} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  header: { alignItems: 'center', paddingBottom: 20, marginBottom: 20, borderBottomColor: '#333232ff', borderBottomWidth: 1 },
  title: { fontSize: 24, fontWeight: '700' },
  backButton: { position: 'absolute', left: 0, top: 0, padding: 10 },
  backText: { fontSize: 16, color: '#007bff' },
});

export default LabThree;