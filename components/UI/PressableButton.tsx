import {
  Pressable,
  PressableProps,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { GlobalStyles } from '../../constans/styles';

interface PressableButtonProps extends PressableProps {
  children: React.ReactNode;
  mode?: 'flat';
}

const PressableButton = ({ children, mode, ...rest }: PressableButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        mode === 'flat' && styles.flat,
        pressed && styles.pressedEffect,
      ]}
      {...rest}
    >
      {/* <View style={[styles.container, mode === 'flat' && styles.flat]}> */}
      <Text style={[styles.text, mode === 'flat' && styles.flatText]}>
        {children}
      </Text>
      {/* </View> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary,
    padding: 8,
  },
  text: {
    color: GlobalStyles.colors.accentText,
  },
  pressedEffect: {
    backgroundColor:"#ccc",
  },
  flat: {
    backgroundColor: 'transparent',
  },
  flatText: {
    color: GlobalStyles.colors.generalText,
  },
});

export default PressableButton;
