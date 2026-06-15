import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Button
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';

export const Home = () => {
  const [model, setmodel] = useState(false);
  const [taskTitle, settaskTitle] = useState("");
  const [task, settask] = useState("");
  const [allTask, setallTask] = useState([]);
  const [loading, setloading] = useState(false);
  
  // State for Modal & Deletion
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  const [editId, seteditId] = useState(null); 

  const API_URL = "http://10.158.161.118:3000/tasks";

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      setloading(true);
      let res = await axios.get(API_URL);
      setallTask(res.data);
    } catch (err) {
      alert("Failed to load tasks");
    } finally {
      setloading(false);
    }
  };

  const handleTask = async () => {
    if (!taskTitle.trim() || !task.trim()) {
      alert("All fields are required");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, { title: taskTitle, description: task });
        setallTask(prev => prev.map(item => item._id === editId ? { ...item, title: taskTitle, description: task } : item));
      } else {
        const res = await axios.post(API_URL, { title: taskTitle, description: task });
        setallTask(prev => [res.data, ...prev]);
      }
    } catch (err) {
      alert("Something went wrong");
    }

    setmodel(false);
    settask("");
    settaskTitle("");
    seteditId(null);
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteId}`);
      setallTask(prev => prev.filter(item => item._id !== deleteId));
      setIsDeleteModalVisible(false);
      setDeleteId(null);
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <View style={styles.container}>
      {/* Task List */}
      <View style={styles.box}>
        {loading ? (
          <ActivityIndicator size="large" color="#3B82F6" />
        ) : (
          <FlatList
            data={allTask}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.taskCard}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <View style={styles.actionRow}>
                  <TouchableOpacity onPress={() => { setmodel(true); settaskTitle(item.title); settask(item.description); seteditId(item._id); }}>
                    <Ionicons name="create-outline" size={22} color="#3B82F6" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setDeleteId(item._id); setIsDeleteModalVisible(true); }}>
                    <Ionicons name="trash-outline" size={22} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* Add Button */}
      <View style={styles.box2}>
        <TouchableOpacity style={styles.taskaddbtn} onPress={() => { setmodel(true); seteditId(null); settask(""); settaskTitle(""); }}>
          <Ionicons size={30} name='add' color={"#fff"} />
        </TouchableOpacity>
      </View>

      {/* Input Modal */}
      <Modal visible={model} transparent animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <TouchableOpacity onPress={() => setmodel(false)}><Entypo style={{ textAlign: "right" }} size={20} name='cross' /></TouchableOpacity>
              <TextInput value={taskTitle} onChangeText={settaskTitle} style={styles.input} placeholder='Task Title' />
              <TextInput value={task} onChangeText={settask} style={styles.input} placeholder='Task Description' multiline />
              <TouchableOpacity style={styles.addBtn} onPress={handleTask}>
                <Text style={{ color: "#fff", textAlign: "center" }}>{editId ? "Update Task" : "Add Task"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Confirmation Modal */}
      <Modal visible={isDeleteModalVisible} transparent animationType='fade'>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 16 }}>Are you sure you want to delete this task?</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <Button title="Cancel" color="gray" onPress={() => setIsDeleteModalVisible(false)} />
              <Button title="Delete" color="red" onPress={deleteTask} />
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6"
  },

  box: {
    flex: 1,
    padding: 20
  },

  box2: {
    position: "absolute",
    bottom: 40,
    right: 30
  },

  taskaddbtn: {
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    elevation: 5
  },

  taskCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3
  },

  title: {
    fontSize: 16,
    fontWeight: "bold"
  },

  desc: {
    marginTop: 5,
    color: "#555"
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 15
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)"
  },

  modalBox: {
    width: 300,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 15
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    borderRadius: 8,
    padding: 12
  },

  addBtn: {
    backgroundColor: "#3B82F6",
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  }
});