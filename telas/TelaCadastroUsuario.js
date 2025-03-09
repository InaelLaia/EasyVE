import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Estilos from '../estilos/Estilos';
import axios from 'axios';
import logo from '../componentes/logo.png';

const api = axios.create({
  baseURL: 'https://easyve-615d7-default-rtdb.firebaseio.com/',
});

function Botao({ texto, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={Estilos.botao}>
      <Text style={Estilos.textoBotao}>{texto}</Text>
    </TouchableOpacity>
  );
}

function TelaDeCadastro({ navigation }) {
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirPassword, setConfirPassword] = useState('');
  const [email, setEmail] = useState('');

  const validarCadastro = async () => {
    if (!username || !login || !password || !confirPassword || !email) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const novoCadastro = {
      username,
      login,
      password,
      email,
    };

    try {
      const response = await api.post('/Usuarios.json', novoCadastro);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        console.log('Dados enviados:', response.data);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
    }

    setUsername('');
    setLogin('');
    setPassword('');
    setConfirPassword('');
    setEmail('');
  };

  return (
    <View style={Estilos.main}>
      <LinearGradient
        colors={['#FFC000', '#FFB100']}
        style={Estilos.background}
        start={{ x: 2.5, y: 0 }}
        locations={[0.7, 0.7]}
      />
      <Image source={logo} style={Estilos.imgLogo} />

      <Text style={Estilos.titulo}>Preencha seus dados abaixo</Text>

      <TextInput
        style={Estilos.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Nome Completo"
        placeholderTextColor="black"
      />

      <TextInput
        style={Estilos.input}
        value={login}
        onChangeText={setLogin}
        placeholder="Usuário"
        placeholderTextColor="black"
      />

      <TextInput
        style={Estilos.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="black"
      />

      <TextInput
        style={Estilos.input}
        value={confirPassword}
        onChangeText={setConfirPassword}
        placeholder="Confirmar Senha"
        secureTextEntry
        placeholderTextColor="black"
      />

      <TextInput
        style={Estilos.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        placeholderTextColor="black"
        keyboardType="email-address"
      />

      <Botao texto="Cadastrar" onPress={validarCadastro} />

      <Botao texto="Voltar" onPress={() => navigation.navigate('TelaLogin')} />
    </View>
  );
}

export default TelaDeCadastro;
