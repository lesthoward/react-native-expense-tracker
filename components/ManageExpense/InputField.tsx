import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { GlobalStyles } from '../../constans/styles';

interface InputFieldProps extends TextInputProps {
  label: string;
  extendContainerStyle?: StyleProp<ViewStyle>;
  extendTextStyle?: StyleProp<TextStyle>;
  invalid?: boolean;
}

const InputField = ({
  label,
  extendContainerStyle,
  extendTextStyle,
  invalid,
  ...rest
}: InputFieldProps) => {
  return (
    <View style={[styles.container, extendContainerStyle]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={[styles.input, extendTextStyle, invalid && styles.invalidInput]} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    ...GlobalStyles.typography.label,
  },
  input: {
    backgroundColor: GlobalStyles.colors.card,
    borderRadius: 4,
    padding: 6,
    borderWidth: 0.3,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error,
  },
  invalidInput: {
    borderColor: GlobalStyles.colors.error,
  }
});

export default InputField;
