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
  Keyboard
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

  const [editId, seteditId] = useState(null); 

  const API_URL = "http://172.16.73.118:3000/tasks";

  useEffect(() => {
    getTasks();
  }, []);

  // 🔥 GET TASKS
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

  // 🔥 ADD / UPDATE TASK
  const handleTask = async () => {
    if (!taskTitle.trim() || !task.trim()) {
      alert("All fields are required");
      return;``
    }

    try {
      if (editId) {
        // ✏️ UPDATE
        await axios.put(`${API_URL}/${editId}`, {
          title: taskTitle,
          description: task
        });

        setallTask(prev =>
          prev.map(item =>
            item._id === editId
              ? { ...item, title: taskTitle, description: task }
              : item
          )
        );

      } else {
        // ➕ ADD
        const newTask = { title: taskTitle, description: task };

        const res = await axios.post(API_URL, newTask);

        setallTask(prev => [res.data, ...prev]);
      }

    } catch (err) {
      alert("Something went wrong");
    }

    // reset
    setmodel(false);
    settask("");
    settaskTitle("");
    seteditId(null);
  };

  // 🔥 DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setallTask(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // 🔥 EDIT TASK
  const editTask = (item) => {
    setmodel(true);
    settaskTitle(item.title);
    settask(item.description);
    seteditId(item._id);
  };

  return (
    <View style={styles.container}>

      {/* 🔥 Task List */}
      <View style={styles.box}>
        {loading ? (
          <ActivityIndicator size="large" color="#3B82F6" />
        ) : allTask.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No Tasks Yet 🚀
          </Text>
        ) : (
          <FlatList
            data={allTask}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.taskCard}>

                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>

                {/* 🔥 ACTION BUTTONS */}
                <View style={styles.actionRow}>
                  <TouchableOpacity onPress={() => editTask(item)}>
                    <Ionicons name="create-outline" size={22} color="#3B82F6" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => deleteTask(item._id)}>
                    <Ionicons name="trash-outline" size={22} color="red" />
                  </TouchableOpacity>
                </View>

              </View>
            )}
          />
        )}
      </View>

      {/* 🔥 Add Button */}
      <View style={styles.box2}>
        <TouchableOpacity
          style={styles.taskaddbtn}
          onPress={() => {
            setmodel(true);
            seteditId(null); // reset edit
            settask("");
            settaskTitle("");
          }}
        >
          <Ionicons size={30} name='add' color={"#fff"} />
        </TouchableOpacity>
      </View>

      {/* 🔥 Modal */}
      <Modal visible={model} transparent animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>

              <TouchableOpacity onPress={() => setmodel(false)}>
                <Entypo style={{ textAlign: "right" }} size={20} name='cross' />
              </TouchableOpacity>

              <TextInput
                value={taskTitle}
                onChangeText={settaskTitle}
                style={styles.input}
                placeholder='Task Title'
              />

              <TextInput
                value={task}
                onChangeText={settask}
                style={styles.input}
                placeholder='Task Description'
                multiline
              />

              <TouchableOpacity style={styles.addBtn} onPress={handleTask}>
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  {editId ? "Update Task" : "Add Task"}
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </TouchableWithoutFeedback>
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