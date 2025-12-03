import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setError('');
  };

  const handleAdd = () => {
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
    onAdd(newTodo);
    clearForm();
  };

  const titleFilled = title.trim().length > 0;
  const descFilled = description.trim().length > 0;
  const bgColor = titleFilled && descFilled ? styles.addButtonBothFilled : titleFilled ? styles.addButtonFilled : styles.addButtonDisabled;

  return (
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
      <Pressable
        onPress={titleFilled ? handleAdd : undefined}
        style={[styles.addButton, bgColor]}
        accessibilityState={{ disabled: !titleFilled }}
      >
        <Text style={[styles.addButtonText, !titleFilled && styles.addButtonTextDisabled]}>Add Todo</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
  addButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  addButtonFilled: { backgroundColor: '#28a745' },
  addButtonBothFilled: { backgroundColor: '#007bff' },
  addButtonDisabled: { backgroundColor: '#ccc' },
  addButtonText: { color: '#fff', fontWeight: '700' },
  addButtonTextDisabled: { color: '#666' },
});

export default TodoForm;
