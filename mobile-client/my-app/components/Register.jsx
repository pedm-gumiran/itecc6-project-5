import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function Register({ setIsRegistering, setTemporaryUserData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      return Alert.alert('Please fill all fields');
    }

    const newUser = { name, email, password };

    setName('');
    setEmail('');
    setPassword('');

    setTemporaryUserData(newUser);
    Alert.alert('Registration successful! Please log in to continue.');
    setIsRegistering(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(false)} style={styles.linkContainer}>
        <Text style={styles.linkText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 16,
    marginBottom: 32,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#32CD32',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 8,
    elevation: 8, 
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  linkContainer: {
    marginTop: 16,
  },
  linkText: {
    color: '#3B82F6',
    textAlign: 'center',
    fontSize: 14,
  },
});
