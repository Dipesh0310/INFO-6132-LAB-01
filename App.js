import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Switch, TouchableOpacity } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      return;
    }
    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      status: 'due/false'
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: task.status === 'due/false' ? 'done/true' : 'due/false' };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getStatusLabel = (status) => {
    return status === 'due/false' ? 'Due/False' : 'Done/True';
  };

  return (
    <View style={styles.container}>
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
              onValueChange={() => toggleTaskStatus(item.id)}
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
  }
});
