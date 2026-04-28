import { Preloader } from '@/components/Preloader';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { InteractionManager } from 'react-native';

SplashScreen.preventAutoHideAsync();

/** Minimum time the Jura loading screen stays visible after fonts are ready */
const MIN_LOADING_MS = 2000;

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Jura-Light': require('@/assets/fonts/jura/static/Jura-Light.ttf'),
    'Jura-Regular': require('@/assets/fonts/jura/static/Jura-Regular.ttf'),
    'Jura-Medium': require('@/assets/fonts/jura/static/Jura-Medium.ttf'),
    'Jura-SemiBold': require('@/assets/fonts/jura/static/Jura-SemiBold.ttf'),
    'Jura-Bold': require('@/assets/fonts/jura/static/Jura-Bold.ttf'),
  });

  const fontsReady = fontsLoaded || fontError;
  const [mainReady, setMainReady] = useState(false);

  useEffect(() => {
    if (fontsReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsReady]);

  useEffect(() => {
    if (!fontsReady) return;

    let cancelled = false;
    const loadingStartedAt = Date.now();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const interactionHandle = InteractionManager.runAfterInteractions(() => {
      const elapsed = Date.now() - loadingStartedAt;
      const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
      timeoutId = setTimeout(() => {
        if (!cancelled) setMainReady(true);
      }, remaining);
    });

    return () => {
      cancelled = true;
      interactionHandle.cancel();
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [fontsReady]);

  if (!fontsReady) {
    return null;
  }

  if (!mainReady) {
    return <Preloader />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

