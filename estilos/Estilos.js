import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderRadius: 15,
    width: 350,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
  },

  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  botao: {
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: 200,
  },

  textoBotao: {
    color: '#FFC000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: 350,
  },

  itemTexto: {
    fontSize: 14,
  },

  empty: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  footerButton: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },

  footerButtonActive: {
    alignItems: 'center',
    backgroundColor: '#292929',
    flex: 1,
    padding: 8,
  },

  imgLogo: {
    width: '50%',
    resizeMode: 'contain',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#FFB100',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default estilos;
