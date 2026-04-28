import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Fonts } from '@/constants/theme'

const Logo = () => {
  return (
      <Text style={styles.title}>Beauty on call</Text>
  )
}

export default Logo

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.medium,
        fontSize: 24,
        textAlign: 'center',
    }
})