import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/Home';
import { Routes } from './src/routes';

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar style="light" translucent backgroundColor='#242a32' />
    </>
  );
}

