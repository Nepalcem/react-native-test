import { Fonts } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

export function Preloader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beauty on call</Text>
      <Text style={styles.subtitle}>Сервіс бронювання beauty - послуг</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: 34,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    marginTop: 16,
    fontSize: 15,
  },
});
