import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import estilos from '../estilos/Estilos';

export default function Botao({ texto, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={estilos.botao}>
        <Text style={estilos.textoBotao}>{texto}</Text>
      </View>
    </TouchableOpacity>
  );
}
