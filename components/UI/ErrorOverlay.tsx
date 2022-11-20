import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import { GlobalStyles } from '../../constans/styles';
import PressableButton from './PressableButton';

interface ErrorOverlayProps {
  message: string;
  onConfirm: () => void;
}

const ErrorOverlay = ({ message, onConfirm }: ErrorOverlayProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error ocurred</Text>
      <Text style={[styles.text, styles.message]}>{message}</Text>
      <PressableButton onPress={onConfirm}>Okay</PressableButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.error,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: GlobalStyles.colors.accentText,
  },
  title: {
    ...GlobalStyles.typography.title,
  },
  message: {
    ...GlobalStyles.typography.general,
  },
});

export default ErrorOverlay;
