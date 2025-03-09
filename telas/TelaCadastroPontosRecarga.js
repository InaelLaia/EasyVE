import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Botao from '../componentes/Botao';
import Footer from '../componentes/Footer';
import Estilos from '../estilos/Estilos';

const api = axios.create({
  baseURL: 'https://easyve-615d7-default-rtdb.firebaseio.com/',
});

export default function TelaAdicionarEndereco({ navigation }) {
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [enderecos, setEnderecos] = useState([]);

  const isValidNumero = (num) => /^\d+$/.test(num);

  const validarCampos = () => {
    if (!rua || !bairro || !numero) {
      alert('Preencha todos os campos!');
      return false;
    } else if (rua.trim().length < 5) {
      Alert.alert('Erro', 'A rua deve ter pelo menos 5 caracteres.');
      return false;
    } else if (bairro.trim().length < 5) {
      Alert.alert('Erro', 'O bairro deve ter pelo menos 5 caracteres.');
      return false;
    } else if (!isValidNumero(numero)) {
      Alert.alert('Erro', 'O número deve ser maior que zero.');
      return false;
    }
    return true;
  };

  const adicionarEndereco = async () => {
    if (!validarCampos()) {
      return;
    }

    const novoEndereco = { rua, bairro, numero };
    try {
      const response = await api.post('/PontosRecarga.json', novoEndereco);
      if (response.status === 200) {
        setEnderecos((prevEnderecos) => [
          ...prevEnderecos,
          { id: response.data.name, ...novoEndereco },
        ]);
        Alert.alert('Sucesso', 'Endereço salvo com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar endereço:', error);
      Alert.alert('Erro', 'Não foi possível salvar o endereço.');
    }

    setRua('');
    setBairro('');
    setNumero('');
  };

  const removerEndereco = async (id) => {
    try {
      await api.delete(`/PontosRecarga/${id}.json`);
      setEnderecos((prevEnderecos) =>
        prevEnderecos.filter((item) => item.id !== id)
      );
      Alert.alert('Sucesso', 'Endereço removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover endereço:', error);
      Alert.alert('Erro', 'Não foi possível remover o endereço.');
    }
  };

  const carregarEnderecos = async () => {
    try {
      const response = await api.get('/PontosRecarga.json');
      if (response.data) {
        const listaEnderecos = Object.keys(response.data)
          .map((key) => ({
            id: key,
            ...response.data[key],
          }))
          .filter((item) => item.rua && item.bairro && item.numero);

        setEnderecos(listaEnderecos);
      }
    } catch (error) {
      console.error('Erro ao carregar endereços:', error);
      Alert.alert('Erro', 'Não foi possível carregar os endereços.');
    }
  };

  useEffect(() => {
    carregarEnderecos();
  }, []);

  return (
    <View style={Estilos.main}>
      <LinearGradient
        colors={['#FFC000', '#FFB100']}
        style={Estilos.background}
        start={{ x: 2.5, y: 0 }}
        locations={[0.7, 0.7]}
      />

      <Text style={Estilos.titulo}>Cadastro pontos de recarga</Text>

      <TextInput
        style={Estilos.input}
        value={rua}
        onChangeText={setRua}
        placeholder="Rua"
        placeholderTextColor="gray"
      />
      <TextInput
        style={Estilos.input}
        value={bairro}
        onChangeText={setBairro}
        placeholder="Bairro"
        placeholderTextColor="gray"
      />
      <TextInput
        style={Estilos.input}
        value={numero}
        onChangeText={setNumero}
        placeholder="Número"
        placeholderTextColor="gray"
        keyboardType="numeric"
      />

      <Botao texto="Salvar" onPress={adicionarEndereco} />

      <FlatList
        data={enderecos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={Estilos.item}>
            <Text
              style={
                Estilos.itemTexto
              }>{`${item.rua}, ${item.bairro}, Nº ${item.numero}`}</Text>
            <TouchableOpacity onPress={() => removerEndereco(item.id)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={Estilos.empty}>Nenhum endereço cadastrado.</Text>
        }
      />

      <Footer navigation={navigation} />
    </View>
  );
}
