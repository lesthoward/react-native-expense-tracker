import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constans/styles';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" size="large" animating={true}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary
  },
})

export default Loader;
