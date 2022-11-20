import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { GlobalStyles } from '../constans/styles';
import ManageExpense from '../screens/ManageExpense';
import BottomTabsNavigator from './BottomTabsNavigator';

export type RootStackParamList = {
  BottomTabsNavigator: undefined;
  ManageExpense: {
    expenseId?: string | number;
  } | undefined;
};

const screenOptions: NativeStackNavigationOptions = {
  headerTitleStyle: {
    fontFamily: GlobalStyles.typography.general.fontFamily,
  },
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: GlobalStyles.colors.tabHeader,
  },
  headerTintColor: GlobalStyles.colors.headerTint,
  animation: 'slide_from_bottom',
  presentation: 'modal',
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NativeStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomTabsNavigator"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="BottomTabsNavigator"
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageExpense"
          component={ManageExpense}
          options={{ title: 'Manage Expense', presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NativeStackNavigator;
