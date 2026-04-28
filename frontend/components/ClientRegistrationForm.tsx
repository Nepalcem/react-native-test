import { Colors, Fonts } from '@/constants/theme';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMemo, useState } from 'react';
import InputDropDownIcon from '@/assets/images/input-drop-down.svg';

export function ClientRegistrationForm() {
  const cities = useMemo(
    () => ['Львів', 'Київ', 'Одеса', 'Дніпро', 'Івано-Франківськ', 'Вінниця'] as const,
    []
  );
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<(typeof cities)[number] | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація клієнта</Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Ваше Ім&apos;я</Text>
          <TextInput style={styles.input} placeholder="Введіть ім'я" placeholderTextColor="#777" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Ваш Номер телефону</Text>
          <View style={styles.phoneRow}>
            <TextInput
              style={[styles.input, styles.countryCodeInput]}
              defaultValue="+380"
              keyboardType="phone-pad"
              placeholderTextColor="#777"
              maxLength={4}
            />
            <TextInput
              style={[styles.input, styles.phoneNumberInput]}
              placeholder="Номер телефону"
              placeholderTextColor="#777"
              keyboardType="phone-pad"
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
          />
        </View>

        <Pressable style={styles.button} accessibilityRole="button">
          <Text style={styles.buttonLabel}>Зареєструватись</Text>
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
  buttonLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.textBlack,
  },
});

