import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

// Create a Drawer Navigator
const Drawer = createDrawerNavigator();

// Custom Drawer Content (used in the Drawer Navigator)
const CustomDrawerContent = ({ userData, setUserData, ...props }) => {
  // Logout function to clear user data
  const handleLogout = () => setUserData(null);

  return (
    <View style={{ flex: 1 }}>
      {/* Drawer Scroll View for content */}
      <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Footer with user's name and logout button */}
      <View style={styles.drawerFooterHorizontal}>
        <Text style={styles.userNameHorizontal}>{userData.name}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutRow}>
          <Ionicons name="log-out" size={20} color="red" />
          <Text style={styles.logoutTextOnly}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Dashboard Screen: Displays a list of workouts
const DashboardScreen = ({ workouts, setWorkouts }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);

  // Calculate duration based on start and end time (HH:MM format)
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime || !startTime.includes(':') || !endTime.includes(':')) return '';
    try {
      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);
      if ([sh, sm, eh, em].some(isNaN)) return '';
      const start = sh * 60 + sm;
      const end = eh * 60 + em;
      const diff = end - start;
      return diff > 0 ? `${diff} min` : '';
    } catch {
      return '';
    }
  };

  // Handle the delete workout action
  const handleDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this workout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setWorkouts((prev) => {
            const updated = prev.filter((w) => w !== selectedWorkout);
            setSelectedWorkout(null);
            return updated;
          });
          Alert.alert('Deleted Successfully');
        },
      },
    ]);
  };

  // Handle saving the edited workout
  const handleSaveEdit = () => {
    Alert.alert('Workout Updated', 'The workout details have been updated successfully.', [
      {
        text: 'OK',
        onPress: () => {
          setWorkouts((prev) => {
            const updated = prev.map((w) =>
              w === selectedWorkout
                ? { ...editingWorkout, duration: calculateDuration(editingWorkout.startTime, editingWorkout.endTime) }
                : w
            );
            setSelectedWorkout({ ...editingWorkout, duration: calculateDuration(editingWorkout.startTime, editingWorkout.endTime) });
            setEditingWorkout(null);
            return updated;
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Title of the page */}
      <Text style={styles.title}>Physical Workout Log</Text>

      {/* List of workouts */}
      <FlatList
        data={workouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.exercise}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Weight: {item.weight} kg</Text>
            <View style={{ paddingTop: 30 }}>
              {/* Button to view workout details */}
              <TouchableOpacity onPress={() => setSelectedWorkout(item)} style={styles.button}><Text style={styles.buttonText}>View Details</Text></TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal: View Details of the selected workout */}
      <Modal visible={!!selectedWorkout && !editingWorkout} animationType="slide">
        <View style={styles.container}>
          {selectedWorkout && (
            <>
              <Text style={styles.title}>{selectedWorkout.exercise} - Details</Text>
              <Text>Date: {selectedWorkout.date}</Text>
              <Text>Sets: {selectedWorkout.sets}</Text>
              <Text>Weight: {selectedWorkout.weight} kg</Text>
              <Text>Start Time: {selectedWorkout.startTime}</Text>
              <Text>End Time: {selectedWorkout.endTime}</Text>
              <Text>Duration: {selectedWorkout.duration}</Text>
              <Text>Notes: {selectedWorkout.notes}</Text>

              {/* Buttons for closing, deleting, or editing the workout */}
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => setSelectedWorkout(null)} style={styles.button}><Text style={styles.buttonText}>Close</Text></TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={[styles.button, { backgroundColor: 'red' }]}><Text style={styles.buttonText}>Delete</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setEditingWorkout(selectedWorkout)} style={[styles.button, { backgroundColor: '#007AFF' }]}><Text style={styles.buttonText}>Edit</Text></TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>

      {/* Modal: Edit Workout Details */}
      <Modal visible={!!editingWorkout} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.title}>Edit Workout</Text>

          {/* Input fields for editing workout details */}
          <TextInput style={styles.input} value={editingWorkout?.exercise} onChangeText={(text) => setEditingWorkout({ ...editingWorkout, exercise: text })} placeholder="Exercise" />
          <TextInput style={styles.input} value={editingWorkout?.date} onChangeText={(text) => setEditingWorkout({ ...editingWorkout, date: text })} placeholder="Date" />
          <TextInput style={styles.input} value={editingWorkout?.sets} onChangeText={(text) => setEditingWorkout({ ...editingWorkout, sets: text })} placeholder="Sets" keyboardType="numeric" />
          <TextInput style={styles.input} value={editingWorkout?.weight} onChangeText={(text) => setEditingWorkout({ ...editingWorkout, weight: text })} placeholder="Weight" keyboardType="numeric" />
          <TextInput style={styles.input} value={editingWorkout?.startTime} onChangeText={(text) => setEditingWorkout({ ...editingWorkout, startTime: text })} placeholder="Start Time" />
          <TextInput style={styles.input} value={editingWorkout?.endTime} onChangeText={(text) => setEditingWorkout({ ...editingWorkout, endTime: text })} placeholder="End Time" />
          <TextInput style={[styles.input, { height: 60 }]} multiline value={editingWorkout?.notes} onChangeText={(text) => setEditingWorkout({ ...editingWorkout, notes: text })} placeholder="Notes" />

          {/* Buttons for canceling or saving the edit */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => setEditingWorkout(null)} style={[styles.button, { backgroundColor: 'red' }]}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleSaveEdit} style={styles.button}><Text style={styles.buttonText}>Update</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Add Workout Screen: Form to add new workout
const AddWorkoutScreen = ({ addWorkout }) => {
  const [exercise, setExercise] = useState('');
  const [date, setDate] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');

  // Calculate duration based on start and end time
  const calculateDuration = () => {
    if (!startTime || !endTime || !startTime.includes(':') || !endTime.includes(':')) return '';
    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    const diff = end - start;
    return diff > 0 ? `${diff} min` : '';
  };

  // Handle form submission and add new workout
  const handleSubmit = () => {
    const duration = calculateDuration();
    const newWorkout = { exercise, date, sets, weight, startTime, endTime, duration, notes };
    addWorkout(newWorkout);
    setExercise(''); setDate(''); setSets(''); setWeight(''); setStartTime(''); setEndTime(''); setNotes('');
    Alert.alert('Workout Added');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Workout</Text>
      <TextInput placeholder="Exercise" value={exercise} onChangeText={setExercise} style={styles.input} />
      <TextInput placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput placeholder="Sets" value={sets} onChangeText={setSets} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Start Time (HH:MM)" value={startTime} onChangeText={setStartTime} style={styles.input} />
      <TextInput placeholder="End Time (HH:MM)" value={endTime} onChangeText={setEndTime} style={styles.input} />
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} multiline style={[styles.input, { height: 60 }]} />
      <Text style={{ paddingBottom: 20 }}>Duration: {calculateDuration()}</Text>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}><Text style={styles.buttonText}>Save Workout</Text></TouchableOpacity>
    </View>
  );
};

// Main Dashboard Component
export default function Dashboard({ userData, setUserData }) {
  const [workouts, setWorkouts] = useState([]);

  // Function to add a new workout to the list
  const addWorkout = (newWorkout) => {
    setWorkouts((prev) => [...prev, newWorkout]);
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawerContent {...props} userData={userData} setUserData={setUserData} />
      )}
    >
      <Drawer.Screen name="Home">
        {(props) => <DashboardScreen {...props} workouts={workouts} setWorkouts={setWorkouts} />}
      </Drawer.Screen>
      <Drawer.Screen name="Add Workouts">
        {(props) => <AddWorkoutScreen {...props} addWorkout={addWorkout} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

// Main App Component
export function App({ userData, setUserData }) {
  return (
    <NavigationContainer>
      <Dashboard userData={userData} setUserData={setUserData} />
    </NavigationContainer>
  );
}

// Styles for the app
const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
    padding: 24,
    paddingHorizontal: 16,
    marginBottom: 32,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#505050',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  buttonRow: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  drawerFooterHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  userNameHorizontal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutTextOnly: {
    marginLeft: 6,
    fontWeight: '600',
    color: '#333',
  },
});
