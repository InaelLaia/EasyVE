import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Estilos from '../estilos/Estilos';
import { UserContext } from '../componentes/Contexto';
import logo from '../componentes/logo.png';

const api = axios.create({
  baseURL: 'https://easyve-615d7-default-rtdb.firebaseio.com/',
});

function TelaDeLogin({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const { setUser } = useContext(UserContext);

  const validateLogin = async () => {
    try {
      const response = await api.get('Usuarios.json');

      if (response.data) {
        const users = [];
        for (const key in response.data) {
          const user = { ...response.data[key], id: key };
          users.push(user);
        }

        const user = users.find(
          (user) => user.login === login && user.password === senha
        );

        if (user) {
          setUser(user);
          Alert.alert('Login bem-sucedido!', `Bem-vindo, ${user.username}!`);
          navigation.navigate('TelaInicial');
        } else {
          Alert.alert('Erro', 'Usuário ou senha incorretos.');
        }
      } else {
        Alert.alert('Erro', 'Nenhum usuário encontrado.');
      }
    } catch (error) {
      console.error('Erro ao validar login:', error);
      Alert.alert('Erro', 'Falha ao conectar com o servidor.');
    }
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

      <TextInput
        style={Estilos.input}
        value={login}
        onChangeText={setLogin}
        placeholder="Usuário"
        placeholderTextColor="black"
      />

      <TextInput
        style={Estilos.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="black"
      />

      <TouchableOpacity style={Estilos.botao} onPress={validateLogin}>
        <Text style={Estilos.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={Estilos.botao}
        onPress={() => navigation.navigate('TelaCadastroUsuario')}>
        <Text style={Estilos.textoBotao}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TelaDeLogin;
