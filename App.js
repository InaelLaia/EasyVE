import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './componentes/Contexto';
import TelaLogin from './telas/TelaLogin';
import TelaCadastroUsuario from './telas/TelaCadastroUsuario';
import TelaInicial from './telas/TelaInicial';
import TelaCadastroVeiculos from './telas/TelaCadastroVeiculos';
import TelaCadastroPontosRecarga from './telas/TelaCadastroPontosRecarga';
import TelaCadastroParceiros from './telas/TelaCadastroParceiros';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TelaLogin">
          <Stack.Screen
            name="TelaLogin"
            component={TelaLogin}
            options={{ title: 'Login' }}
          />

          <Stack.Screen
            name="TelaInicial"
            component={TelaInicial}
            options={{ title: 'Início' }}
          />

          <Stack.Screen
            name="TelaCadastroUsuario"
            component={TelaCadastroUsuario}
            options={{ title: 'Cadastro de Usuário' }}
          />

          <Stack.Screen
            name="TelaCadastroVeiculos"
            component={TelaCadastroVeiculos}
            options={{ title: 'Cadastro de Veículos' }}
          />

          <Stack.Screen
            name="TelaCadastroPontosRecarga"
            component={TelaCadastroPontosRecarga}
            options={{ title: 'Cadastro de Pontos de Recarga' }}
          />

          <Stack.Screen
            name="TelaCadastroParceiros"
            component={TelaCadastroParceiros}
            options={{ title: 'Cadastro de Parceiros' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
