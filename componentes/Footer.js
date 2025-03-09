import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import estilos from '../estilos/Estilos';

export default function Footer({ navigation }) {
  return (
    <View style={estilos.footer}>
      <TouchableOpacity
        style={estilos.footerButtonActive}
        onPress={() => navigation.navigate('TelaInicial')}>
        <Ionicons name="home" size={24} color="#FFC000" />
        <Text style={{ color: '#FFC000' }}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.footerButton}
        onPress={() =>
          Alert.alert('Sair', 'Você deseja realmente sair do aplicativo?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sair', onPress: () => navigation.navigate('TelaLogin') },
          ])
        }>
        <Ionicons name="exit-outline" size={24} color="#b1b1b1" />
        <Text style={{ color: '#b1b1b1' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
