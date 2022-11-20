import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp, TypedNavigator } from '@react-navigation/native';
import { GlobalStyles } from '../constans/styles';
import AllExpenses from '../screens/AllExpenses';
import RecentExpenses from '../screens/RecentExpenses';
import { Ionicons as IconList } from '@expo/vector-icons';
import PressableIcon from '../components/UI/PressableIcon';
import { StatusBar } from 'expo-status-bar';
const BottomTabs = createBottomTabNavigator();

export type BottomTabsParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

// type ScreenOptions =
//   | BottomTabNavigationOptions
//   | ((props: {
//       route: RouteProp<BottomTabsParamList>;
//       navigation: any;
//     }) => BottomTabNavigationOptions);
type ScreenOptions =
  | BottomTabNavigationOptions
  | ((props: any) => BottomTabNavigationOptions);

const screenOptions: ScreenOptions = ({ route, navigation }) => ({
  headerStyle: {
    backgroundColor: GlobalStyles.colors.tabHeader,
  },
  headerTintColor: GlobalStyles.colors.headerTint,
  tabBarStyle: {
    backgroundColor: GlobalStyles.colors.tabHeader,
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: GlobalStyles.typography.general.fontFamily,
  },
  tabBarLabelStyle: {
    fontFamily: GlobalStyles.typography.general.fontFamily,
  },
  tabBarInactiveTintColor: GlobalStyles.colors.tabBarInactiveTintColor,
  tabBarInactiveBackgroundColor:
    GlobalStyles.colors.tabBarInactiveBackgroundColor,
  tabBarActiveBackgroundColor: GlobalStyles.colors.tabBarActiveBackgroundColor,
  tabBarActiveTintColor: GlobalStyles.colors.tabBarActiveTintColor,
  headerRight: ({ tintColor }) => {
    return (
      <PressableIcon
        iconName="add"
        color={tintColor}
        size={24}
        onPress={() => {
          navigation.navigate('ManageExpense');
        }}
      />
    );
  },
});

const BottomTabsNavigator = () => {
  return (
    <>
      <StatusBar style={GlobalStyles.colors.statusBar} />
      <BottomTabs.Navigator
        initialRouteName="RecentExpenses"
        screenOptions={screenOptions}
      >
        {/* <BottomTabs.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent Expenses',
            tabBarIcon: ({ size, color }) => (
              <IconList size={size} color={color} name="hourglass" />
            ),
          }}
        /> */}
        <BottomTabs.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel: 'All Expenses',
            tabBarIcon: ({ size, color }) => (
              <IconList size={size} color={color} name="wallet" />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </>
  );
};

export default BottomTabsNavigator;
