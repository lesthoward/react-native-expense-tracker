import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import NativeStackNavigator from './navigator/NativeStackNavigator';
import * as SplashScreen from 'expo-splash-screen';
import {
  SourceSansPro_300Light,
  SourceSansPro_300Light_Italic,
  SourceSansPro_400Regular,
  SourceSansPro_400Regular_Italic,
  SourceSansPro_600SemiBold,
  SourceSansPro_600SemiBold_Italic,
  SourceSansPro_700Bold,
  SourceSansPro_700Bold_Italic,
} from '@expo-google-fonts/source-sans-pro';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import ExpensesProvider from './context/expenses/ExpensesContext';
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const prepareAppState = async () => {
    try {
      await Font.loadAsync({
        SourceSansPro_300Light,
        SourceSansPro_300Light_Italic,
        SourceSansPro_400Regular,
        SourceSansPro_400Regular_Italic,
        SourceSansPro_600SemiBold,
        SourceSansPro_600SemiBold_Italic,
        SourceSansPro_700Bold,
        SourceSansPro_700Bold_Italic,
      });
    } catch (error) {
      console.warn(error);
    } finally {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    prepareAppState();
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <>
      <ExpensesProvider>
        <NativeStackNavigator />
      </ExpensesProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
