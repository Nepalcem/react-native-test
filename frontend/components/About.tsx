import { Colors, Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Logo from './Logo';

export function About() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.bodyBlock}>
        <Text style={styles.paragraph}>
          Beauty on call — твій новий спосіб замовляти beauty-послуги легко, швидко і там, де тобі зручно.
        </Text>
        <Text style={styles.paragraph}>
          Тепер не потрібно витрачати час на пошуки майстра чи довге очікування у салоні.
        </Text>
        <Text style={[styles.paragraph, styles.paragraphLast]}>
          Просто відкрий додаток, обери послугу — і професійний beauty-майстер приїде до тебе додому або прийме в себе у зручний для тебе час.
        </Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => router.push('/role')}
        accessibilityRole="button"
      >
        <Text style={styles.buttonLabel}>Продовжити</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  bodyBlock: {
    marginTop: 40,
    marginBottom: 39,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  paragraph: {
    fontFamily: Fonts.medium,
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  paragraphLast: {
    marginBottom: 0,
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 37,
    borderRadius: 16,
    backgroundColor: Colors.backgroundGray,
  },
  buttonLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: '#000',
  },
});
