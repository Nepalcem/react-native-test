import { Fonts, Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Logo from './Logo';

export function Role() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.paragraph}>Знайдіть майстра, що виконає ваше замовлення, 
      або пропонуйте свої послуги та знаходьте нових клієнтів.</Text>
      <Text style={styles.subtitle}>Оберіть свою роль</Text>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() =>
            router.push({ pathname: '/register' as any, params: { role: 'master' } })
          }
          accessibilityRole="button"
        >
          <Text style={styles.buttonTextMaster}>Я - Майстер</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() =>
            router.push({ pathname: '/register' as any, params: { role: 'client' } })
          }
          accessibilityRole="button"
        >
          <Text style={styles.buttonTextClient}>Я - Клієнт</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  paragraph: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    marginTop: 24,
  },
  subtitle: {
    fontFamily: Fonts.medium,
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonsContainer: {
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 640,
    marginTop: 24,
  },
  button: {
    backgroundColor: Colors.backgroundGray,
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
  buttonTextMaster: {
    fontFamily: Fonts.semiBold,
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 17,
    color: Colors.textBlack,
  },
  buttonTextClient: {
    fontFamily: Fonts.semiBold,
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 17,
    color: Colors.textRed,
  },
});
