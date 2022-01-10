import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login/login'
import CryptoListScreen from './src/screens/crypto_list/crypto_list'
import ChartScreen from './src/screens/chart/chart'
import HeaderTitle from './src/components/header_title'


const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    fontFamily:'Roboto'

  },
};

const App = () => {
  return (
    <NavigationContainer  theme={AppTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CryptoList"
          options={{ headerShown: false }}
          component={CryptoListScreen} />
        <Stack.Screen name="Chart"
                options={{ 
                  headerShadowVisible:false,
                  headerTitleAlign: 'center',
              }}
                component={ChartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;