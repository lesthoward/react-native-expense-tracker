import {
  Pressable,
  View,
  PressableProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Ionicons as IconList } from '@expo/vector-icons';

interface PressableIconProps extends PressableProps {
  iconName: keyof typeof IconList.glyphMap;
  size?: number;
  color?: string;
  extendContainerStyle?: StyleProp<ViewStyle>;
}

const PressableIcon = ({
  iconName,
  size,
  color,
  extendContainerStyle,
  ...rest
}: PressableIconProps) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressedEffect}
      {...rest}
    >
      <View style={[styles.container, extendContainerStyle]}>
        <IconList name={iconName} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 16,
  },
  pressedEffect: {
    opacity: 0.5,
  },
});

export default PressableIcon;
