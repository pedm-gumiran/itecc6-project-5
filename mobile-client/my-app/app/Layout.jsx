import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';

export default function Layout() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [userData, setUserData] = useState(null);
  const [temporaryUserData, setTemporaryUserData] = useState(null);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* Only Login and Register inside the container */}
      {!userData && (
        <View style={styles.container}>
          <Text style={styles.title}>Physical Workout Log</Text>
          {isRegistering ? (
            <Register
              setIsRegistering={setIsRegistering}
              setTemporaryUserData={setTemporaryUserData}
            />
          ) : (
            <Login
              setIsRegistering={setIsRegistering}
              setUserData={setUserData}
              temporaryUserData={temporaryUserData}
            />
          )}
        </View>
      )}

      {/* Dashboard will be outside the container */}
      {userData && (
        <Dashboard userData={userData} setUserData={setUserData} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  container: {
    padding: 40,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    maxWidth: 350,
    alignSelf: 'center',
    maxHeight: 500,
  },
  title: {
    textAlign: 'center',
    padding: 9,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#505050',
  },
});
