import { Colors, Fonts } from '@/constants/theme';
import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import InputDropDownIcon from '@/assets/images/input-drop-down.svg';

const MASTER_REGISTER_URL = 'http://192.168.1.130:3003/users/master';

export function MasterRegistrationForm() {
  const cities = useMemo(
    () => ['Львів', 'Київ', 'Одеса', 'Дніпро', 'Івано-Франківськ', 'Вінниця'] as const,
    []
  );
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<(typeof cities)[number] | null>(null);
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+380');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (submitting) return;

    try {
      setSubmitting(true);
      const res = await fetch(MASTER_REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: `${countryCode}${phoneNumber}`,
          city: selectedCity ?? '',
          district,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Request failed: ${res.status} ${text}`);
      }

      Alert.alert('Успіх', 'Реєстрація пройшла успішно');
      setName('');
      setCountryCode('+380');
      setPhoneNumber('');
      setDistrict('');
      setSelectedCity(null);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      console.error(message);
      Alert.alert('Помилка', message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація майстра</Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Ваше Ім&apos;я</Text>
          <TextInput
            style={styles.input}
            placeholder="Введіть ім'я"
            placeholderTextColor="#777"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Ваш Номер телефону</Text>
          <View style={styles.phoneRow}>
            <TextInput
              style={[styles.input, styles.countryCodeInput]}
              value={countryCode}
              onChangeText={setCountryCode}
              keyboardType="phone-pad"
              placeholderTextColor="#777"
              maxLength={4}
            />
            <TextInput
              style={[styles.input, styles.phoneNumberInput]}
              placeholder="Номер телефону"
              placeholderTextColor="#777"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Місто</Text>
          <Pressable
            style={styles.select}
            accessibilityRole="button"
            onPress={() => setCityOpen((v) => !v)}
          >
            <Text style={[styles.selectPlaceholder, selectedCity && styles.selectValue]}>
              {selectedCity ?? 'Оберіть місто'}
            </Text>
            <View style={[styles.dropdownIcon, cityOpen && styles.dropdownIconOpen]}>
              <InputDropDownIcon width={10} height={6} />
            </View>
          </Pressable>
          {cityOpen ? (
            <View style={styles.dropdown}>
              {cities.map((city, idx) => {
                const isSelected = city === selectedCity;
                return (
                  <Pressable
                    key={city}
                    style={[styles.dropdownItem, idx === cities.length - 1 && styles.dropdownItemLast]}
                    accessibilityRole="button"
                    onPress={() => {
                      setSelectedCity(city);
                      setCityOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{city}</Text>
                    <Text style={styles.checkmark}>{isSelected ? '✓' : ''}</Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Район</Text>
          <TextInput
            style={styles.input}
            placeholder="Введіть район"
            placeholderTextColor="#777"
            value={district}
            onChangeText={setDistrict}
          />
        </View>

        <Pressable
          style={[styles.button, submitting && styles.buttonDisabled]}
          accessibilityRole="button"
          disabled={submitting}
          onPress={submit}
        >
          <Text style={styles.buttonLabel}>
            {submitting ? 'Надсилаємо...' : 'Зареєструватись'}
          </Text>
        </Pressable>
      </View>
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
  title: {
    fontFamily: Fonts.medium,
    fontSize: 24,
    textAlign: 'center',
    color: Colors.textBlack,
    marginBottom: 16,
  },
  form: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    gap: 12,
  },
  field: {
    gap: 6,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: Colors.textBlack,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.backgroundGray,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: Colors.textBlack,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: 4,
  },
  countryCodeInput: {
    width: 86,
    textAlign: 'center',
    paddingHorizontal: 0,
  },
  phoneNumberInput: {
    flex: 1,
  },
  select: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.backgroundGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectPlaceholder: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: '#777',
  },
  dropdownIcon: {
    marginLeft: 12,
  },
  dropdownIconOpen: {
    transform: [{ rotate: '180deg' }],
  },
  selectValue: {
    color: Colors.textBlack,
  },
  dropdown: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.backgroundGray,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundGray,
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: Colors.textBlack,
  },
  checkmark: {
    width: 18,
    textAlign: 'right',
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.textBlack,
  },
  button: {
    marginTop: 8,
    backgroundColor: Colors.backgroundGray,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.textBlack,
  },
});

