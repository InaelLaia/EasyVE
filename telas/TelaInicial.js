import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Estilos from '../estilos/Estilos';
import { UserContext } from '../componentes/Contexto';

function Botao({ texto, onPress, estiloPersonalizado }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Estilos.botao, estiloPersonalizado]}>
      <Text style={Estilos.textoBotao}>{texto}</Text>
    </TouchableOpacity>
  );
}

function TelaInicial({ navigation }) {
  const { user } = useContext(UserContext);

  const sairDoApp = () => {
    Alert.alert('Sair', 'Você deseja realmente sair do aplicativo?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => navigation.navigate('TelaLogin') },
    ]);
  };

  return (
    <View style={Estilos.main}>
      <LinearGradient
        colors={['#FFC000', '#FFB100']}
        style={Estilos.background}
        start={{ x: 2.5, y: 0 }}
        locations={[0.7, 0.7]}
      />
      {user && <Text style={Estilos.titulo}>Bem-vindo, {user.username}!</Text>}

      <Botao
        texto="Cadastro de Veículos"
        onPress={() => navigation.navigate('TelaCadastroVeiculos')}
      />
      <Botao
        texto="Cadastro de Pontos de Recarga"
        onPress={() => navigation.navigate('TelaCadastroPontosRecarga')}
      />
      <Botao
        texto="Cadastro de Parceiros"
        onPress={() => navigation.navigate('TelaCadastroParceiros')}
      />
      <Botao
        texto="Sair"
        onPress={sairDoApp}
        estiloPersonalizado={{
          marginTop: 20,
          backgroundColor: '#FF3333',
          width: 100,
          alignSelf: 'center',
        }}
      />
    </View>
  );
}

export default TelaInicial;
