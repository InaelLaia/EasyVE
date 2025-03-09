import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
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

function CadastroParceiro({ navigation }) {
  const [nome, setNome] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [desconto, setDesconto] = useState('');
  const [parceiros, setParceiros] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [parceiroSelecionado, setParceiroSelecionado] = useState(null);

  const validarCampos = () => {
    if (!nome || !rua || !bairro || !numero || !desconto) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return false;
    } else if (nome.trim().length < 3) {
      Alert.alert('Erro', 'O nome deve ter pelo menos 3 caracteres.');
      return false;
    } else if (rua.trim().length < 3 || bairro.trim().length < 3) {
      Alert.alert('Erro', 'Rua e Bairro devem ter pelo menos 3 caracteres.');
      return false;
    } else if (isNaN(desconto) || desconto <= 0) {
      Alert.alert('Erro', 'O desconto deve ser um número maior que zero.');
      return false;
    }
    return true;
  };

  const salvarParceiro = async () => {
    if (!validarCampos()) return;

    const novoParceiro = { nome, rua, bairro, numero, desconto };
    try {
      const response = await api.post('/Parceiros.json', novoParceiro);
      if (response.status === 200) {
        setParceiros((prevParceiros) => [
          ...prevParceiros,
          { id: response.data.name, ...novoParceiro },
        ]);
        Alert.alert('Sucesso', 'Parceiro salvo com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar parceiro:', error);
      Alert.alert('Erro', 'Não foi possível salvar o parceiro.');
    }

    setNome('');
    setRua('');
    setBairro('');
    setNumero('');
    setDesconto('');
  };

  const carregarParceiros = async () => {
    try {
      const response = await api.get('/Parceiros.json');
      if (response.data) {
        const listaParceiros = Object.keys(response.data)
          .map((key) => ({
            id: key,
            ...response.data[key],
          }))
          .filter(
            (item) => item.nome && item.desconto && !isNaN(item.desconto)
          );

        setParceiros(listaParceiros);
      }
    } catch (error) {
      console.error('Erro ao carregar parceiros:', error);
      Alert.alert('Erro', 'Não foi possível carregar os parceiros.');
    }
  };

  const removerParceiro = async (id) => {
    try {
      await api.delete(`/Parceiros/${id}.json`);
      setParceiros((prevParceiros) =>
        prevParceiros.filter((item) => item.id !== id)
      );
      Alert.alert('Sucesso', 'Parceiro removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover parceiro:', error);
      Alert.alert('Erro', 'Não foi possível remover o parceiro.');
    }
  };

  const abrirModal = (parceiro) => {
    setParceiroSelecionado(parceiro);
    setModalVisible(true);
  };

  useEffect(() => {
    carregarParceiros();
  }, []);

  return (
    <View style={Estilos.main}>
      <LinearGradient
        colors={['#FFC000', '#FFB100']}
        style={Estilos.background}
        start={{ x: 2.5, y: 0 }}
        locations={[0.7, 0.7]}
      />

      <Text style={Estilos.titulo}>Cadastro de Parceiros</Text>

      <TextInput
        style={Estilos.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do parceiro"
        placeholderTextColor="gray"
      />
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
      <TextInput
        style={Estilos.input}
        value={desconto}
        onChangeText={setDesconto}
        placeholder="Desconto (%)"
        placeholderTextColor="gray"
        keyboardType="numeric"
      />

      <Botao texto="Salvar" onPress={salvarParceiro} />

      <FlatList
        data={parceiros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={Estilos.item}>
            <TouchableOpacity onPress={() => abrirModal(item)}>
              <Ionicons name="information-circle" size={20} color="blue" />
            </TouchableOpacity>
            <Text
              style={
                Estilos.itemTexto
              }>{`${item.nome} - ${item.desconto}%`}</Text>
            <TouchableOpacity onPress={() => removerParceiro(item.id)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={Estilos.empty}>Nenhum parceiro cadastrado.</Text>
        }
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={Estilos.modalContainer}>
          <View style={Estilos.modalContent}>
            {parceiroSelecionado && (
              <>
                <Text style={Estilos.modalText}>
                  Nome: {parceiroSelecionado.nome}
                </Text>
                <Text style={Estilos.modalText}>
                  Endereço: {parceiroSelecionado.rua},{' '}
                  {parceiroSelecionado.bairro}, Nº {parceiroSelecionado.numero}
                </Text>
                <Text style={Estilos.modalText}>
                  Desconto: {parceiroSelecionado.desconto}%
                </Text>
              </>
            )}
            <TouchableOpacity
              style={Estilos.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={Estilos.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer navigation={navigation} />
    </View>
  );
}

export default CadastroParceiro;
