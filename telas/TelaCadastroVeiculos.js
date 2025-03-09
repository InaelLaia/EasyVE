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

export default function TelaAdicionarVeiculo({ navigation }) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [placa, setPlaca] = useState('');
  const [veiculos, setVeiculos] = useState([]);

  const isValidPlaca = (placa) => /^[A-Z]{3}\d{4}$/i.test(placa);

  const validarCampos = () => {
    if (!marca || !modelo || !ano || !placa) {
      alert('Preencha todos os campos!');
      return false;
    } else if (marca.trim().length < 2) {
      Alert.alert('Erro', 'A marca deve ter pelo menos 2 caracteres.');
      return false;
    } else if (modelo.trim().length < 2) {
      Alert.alert('Erro', 'O modelo deve ter pelo menos 2 caracteres.');
      return false;
    } else if (
      !/^\d{4}$/.test(ano) ||
      ano < 1900 ||
      ano > new Date().getFullYear()
    ) {
      Alert.alert(
        'Erro',
        'O ano deve ser um número válido entre 1900 e o ano atual.'
      );
      return false;
    } else if (!isValidPlaca(placa)) {
      Alert.alert('Erro', 'A placa deve seguir o formato ABC1234.');
      return false;
    }
    return true;
  };

  const adicionarVeiculo = async () => {
    if (!validarCampos()) {
      return;
    }

    const novoVeiculo = { marca, modelo, ano, placa };
    try {
      const response = await api.post('/Veiculos.json', novoVeiculo);
      if (response.status === 200) {
        setVeiculos((prevVeiculos) => [
          ...prevVeiculos,
          { id: response.data.name, ...novoVeiculo },
        ]);
        Alert.alert('Sucesso', 'Veículo salvo com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar veículo:', error);
      Alert.alert('Erro', 'Não foi possível salvar o veículo.');
    }

    setMarca('');
    setModelo('');
    setAno('');
    setPlaca('');
  };

  const removerVeiculo = async (id) => {
    try {
      await api.delete(`/Veiculos/${id}.json`);
      setVeiculos((prevVeiculos) =>
        prevVeiculos.filter((item) => item.id !== id)
      );
      Alert.alert('Sucesso', 'Veículo removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover veículo:', error);
      Alert.alert('Erro', 'Não foi possível remover o veículo.');
    }
  };

  const carregarVeiculos = async () => {
    try {
      const response = await api.get('/Veiculos.json');
      if (response.data) {
        const listaVeiculos = Object.keys(response.data)
          .map((key) => ({
            id: key,
            ...response.data[key],
          }))
          .filter(
            (item) => item.marca && item.modelo && item.ano && item.placa
          );

        setVeiculos(listaVeiculos);
      }
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os veículos.');
    }
  };

  useEffect(() => {
    carregarVeiculos();
  }, []);

  return (
    <View style={Estilos.main}>
      <LinearGradient
        colors={['#FFC000', '#FFB100']}
        style={Estilos.background}
        start={{ x: 2.5, y: 0 }}
        locations={[0.7, 0.7]}
      />

      <Text style={Estilos.titulo}>Cadastro de Veículos</Text>

      <TextInput
        style={Estilos.input}
        value={marca}
        onChangeText={setMarca}
        placeholder="Marca"
        placeholderTextColor="gray"
      />
      <TextInput
        style={Estilos.input}
        value={modelo}
        onChangeText={setModelo}
        placeholder="Modelo"
        placeholderTextColor="gray"
      />
      <TextInput
        style={Estilos.input}
        value={ano}
        onChangeText={setAno}
        placeholder="Ano"
        placeholderTextColor="gray"
        keyboardType="numeric"
      />
      <TextInput
        style={Estilos.input}
        value={placa}
        onChangeText={setPlaca}
        placeholder="Placa (ABC1234)"
        placeholderTextColor="gray"
      />

      <Botao texto="Salvar" onPress={adicionarVeiculo} />

      <FlatList
        data={veiculos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={Estilos.item}>
            <Text
              style={
                Estilos.itemTexto
              }>{`${item.marca} ${item.modelo}, Ano: ${item.ano}, Placa: ${item.placa}`}</Text>
            <TouchableOpacity onPress={() => removerVeiculo(item.id)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={Estilos.empty}>Nenhum veículo cadastrado.</Text>
        }
      />

      <Footer navigation={navigation} />
    </View>
  );
}
