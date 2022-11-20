import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  Pressable,
  PressableProps,
  View,
} from 'react-native';
import { GlobalStyles } from '../../constans/styles';
import { RootStackParamList } from '../../navigator/NativeStackNavigator';
import { ScreenList, ScreenParams } from '../../types/app';

interface ExpensesItemProps extends PressableProps {
  id: string | number;
  title: string;
  amount: number;
  date: string;
  toScreen: ScreenList;
  [key: string]: any;
}

const ExpensesItem = ({
  id,
  title,
  amount,
  date,
  toScreen,
  ...rest
}: ExpensesItemProps) => {
  const navigation = useNavigation<NavigationProp<ScreenParams>>();
  const expensePressHandler = () => {
    navigation.navigate('ManageExpense', { expenseId: id });
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedEffect,
      ]}
      {...rest}
      onPress={expensePressHandler}
    >
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.card,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    padding: 12,
    ...GlobalStyles.shadows.card,
  },
  text: {
    color: GlobalStyles.colors.noHighlight,
    marginBottom: 4,
    ...GlobalStyles.typography.expense,
  },
  title: {
    ...GlobalStyles.typography.subtitle,
  },
  priceContainer: {
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.numbers,
    borderRadius: 4,
    justifyContent: 'center',
    minWidth: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  price: {
    color: GlobalStyles.colors.accentText,
    ...GlobalStyles.typography.numbers,
  },
  pressedEffect: {
    opacity: 0.75,
  },
});

export default ExpensesItem;
