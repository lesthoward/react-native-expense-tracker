import { StatusBarStyle } from 'expo-status-bar';
import { TextStyle } from 'react-native';

interface ITypography {
  fontFamily: TextStyle['fontFamily'];
  fontSize?: TextStyle['fontSize'];
  lineHeight?: TextStyle['lineHeight'];
}

interface IGlobalStyles {
  colors: {
    primary: string;
    tabHeader: string;
    headerTint: string;
    tabBarActiveTint: string;
    card: string;
    generalText: string;
    accentText: string;
    contentBackground: string;
    statusBar: StatusBarStyle;
    accentStatusBar: StatusBarStyle;
    numbers: string;
    border: string;
    topExpenseBg: string;
    topExpenseText: string;
    tabBarInactiveTintColor: string;
    tabBarInactiveBackgroundColor: string;
    tabBarActiveBackgroundColor: string;
    tabBarActiveTintColor: string;
    noHighlight: string;
    pressableButtonBg: string;
    pressedButtonBg: string;
    pressedButtonText: string;
    success: string;
    error: string;
    dangerBg: string;
    calendar: {
      backgroundColor: string;
      textHeaderColor: string;
      textDefaultColor: string;
      selectedTextColor: string;
      mainColor: string;
      textSecondaryColor: string;
      borderColor: string;
    };
  };
  typography: {
    general: ITypography;
    expense: ITypography;
    title: ITypography;
    subtitle: ITypography;
    numbers: ITypography;
    label: ITypography;
  };
  shadows: {
    card: {
      elevation: number;
      shadowColor: string;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowOpacity: number;
      shadowRadius: number;
    };
  };
}

export const GlobalStyles: IGlobalStyles = {
  colors: {
    // Global
    primary: '#2c71d8',
    card: '#fff',
    generalText: '#222',
    accentText: '#fff',
    contentBackground: '#f2f2f2',
    statusBar: 'light',
    accentStatusBar: 'dark',
    topExpenseBg: '#2c71d8',
    topExpenseText: '#fff',
    noHighlight: '#a9a9a9',
    pressableButtonBg: '#222',
    numbers: '#ec5757',
    // Navigation
    tabHeader: '#222',
    headerTint: '#f2f2f2',
    tabBarActiveTint: '#2c71d8',
    tabBarInactiveTintColor: '#c9c9c9c9',
    tabBarInactiveBackgroundColor: '#262626',
    tabBarActiveBackgroundColor: '#262626',
    tabBarActiveTintColor: '#fff',
    // Effects
    pressedButtonBg: '#2c71d8',
    pressedButtonText: '#fff',
    // Utilities
    border: '#4a4a4a',
    success: '#21d47a',
    error: '#df5454',
    dangerBg: '#eb59598e',

    calendar: {
      backgroundColor: '#222',
      textHeaderColor: '#5ba2ff',
      textDefaultColor: '#fff',
      selectedTextColor: '#fff',
      mainColor: '#2b9af4',
      textSecondaryColor: '#fff',
      borderColor: 'rgba(122, 146, 165, 0.1)',
    },
  },
  typography: {
    general: {
      fontFamily: 'SourceSansPro_400Regular',
    },
    expense: {
      fontFamily: 'SourceSansPro_400Regular',
    },
    title: {
      fontFamily: 'SourceSansPro_700Bold',
      fontSize: 24,
    },
    subtitle: {
      fontFamily: 'SourceSansPro_600SemiBold',
      fontSize: 18,
    },
    numbers: {
      fontFamily: 'SourceSansPro_600SemiBold_Italic',
      fontSize: 16,
    },
    label: {
      fontFamily: 'SourceSansPro_300Light_Italic',
      fontSize: 16,
    },
  },
  shadows: {
    card: {
      elevation: 2,
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 4,
    },
  },
};
