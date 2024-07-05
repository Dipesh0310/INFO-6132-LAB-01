import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Switch, TouchableOpacity } from 'react-native';
import { database } from './firebaseConfig';
import { ref, onValue, set, remove, update } from 'firebase/database';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    const tasksRef = ref(database, 'Lab');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedTasks = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setTasks(fetchedTasks);
      } else {
        setTasks([]);
      }
    });
  }, []);

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      alert('Please enter a task title.');
      return;
    }
    const newTaskRef = ref(database, `Lab/${Date.now()}`);
    set(newTaskRef, {
      title: taskTitle,
      status: 'due/false'
    });
    setTaskTitle('');
  };

  const toggleTaskStatus = (id, status) => {
    const taskRef = ref(database, `Lab/${id}`);
    update(taskRef, {
      status: status === 'due/false' ? 'done/true' : 'due/false'
    });
  };

  const deleteTask = (id) => {
    const taskRef = ref(database, `Lab/${id}`);
    remove(taskRef);
  };

  const getStatusLabel = (status) => {
    return status === 'due/false' ? 'Due/False' : 'Done/True';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.footer}>This app created by Dipesh_Chaudhary_1168556</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <Button
        title="Add Task"
        onPress={handleAddTask}
        disabled={taskTitle.trim() === ''}
      />
      {tasks.length > 0 && (
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Title</Text>
          <Text style={styles.header}>Toggle</Text>
          <Text style={styles.header}>Status</Text>
          <Text style={styles.header}>Delete</Text>
        </View>
      )}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskItem}>{item.title}</Text>
            <Switch
              trackColor={{ false: "lightyellow", true: "lightgreen" }}
              thumbColor={item.status === 'due/false' ? "yellow" : "green"}
              onValueChange={() => toggleTaskStatus(item.id, item.status)}
              value={item.status === 'done/true'}
            />
            <Text style={styles.taskItem}>{getStatusLabel(item.status)}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  input: {
    height: 42,
    margin: 12,
    borderWidth: 3,
    padding: 12,
    width: '90%',
    fontSize: 15,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 30,
    width: '95%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10,
    width: '98%',
    backgroundColor: '#f0f0f0'
  },
  taskItem: {
    fontSize: 16,
  },
  deleteButton: {
    fontSize: 24,
    color: 'red',
    padding: 10
  },
  footer: {
    fontSize: 14,
    color: 'grey',
    padding: 10
  }
});
