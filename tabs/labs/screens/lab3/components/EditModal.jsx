import React from 'react';
import { View, Text, TextInput, Modal, Pressable, StyleSheet } from 'react-native';

const EditModal = ({ editing, onSave, onCancel }) => {
  const [title, setTitle] = React.useState(editing?.title ?? '');
  const [description, setDescription] = React.useState(editing?.description ?? '');

  React.useEffect(() => {
    setTitle(editing?.title ?? '');
    setDescription(editing?.description ?? '');
  }, [editing]);

  const handleSave = () => {
    const t = title.trim();
    if (!t) return;
    onSave({ ...editing, title: t, description: description.trim() });
  };

  const titleFilled = title.trim().length > 0;

  return (
    <Modal visible={!!editing} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Todo</Text>
          <Text style={styles.inputDescription}>Title</Text>
          <TextInput
            placeholder="Title (required)"
            value={title}
            onChangeText={setTitle}
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
          <View style={styles.modalButtons}>
            <Pressable
              onPress={titleFilled ? handleSave : undefined}
              style={[styles.addButton, titleFilled ? styles.addButtonFilled : styles.addButtonDisabled]}
              accessibilityState={{ disabled: !titleFilled }}
            >
              <Text style={[styles.addButtonText, !titleFilled && styles.addButtonTextDisabled]}>Save</Text>
            </Pressable>
            <Pressable onPress={onCancel} style={[styles.smallButton, { marginLeft: 8, justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={styles.smallButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  modalContent: { width: '90%', backgroundColor: '#fff', padding: 16, borderRadius: 8 },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  inputDescription: { fontSize: 12, fontWeight: '600', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  descriptionInput: { minHeight: 40 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  addButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  addButtonFilled: { backgroundColor: '#28a745' },
  addButtonDisabled: { backgroundColor: '#ccc' },
  addButtonText: { color: '#fff', fontWeight: '700' },
  addButtonTextDisabled: { color: '#666' },
  smallButton: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, backgroundColor: '#eee' },
  smallButtonText: { color: '#333' },
});

export default EditModal;
