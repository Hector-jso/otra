import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Militar: require('../assets/fonts/KaiseiTokumin-Regular.ttf'),
    Militar_Bold: require('../assets/fonts/KaiseiTokumin-Bold.ttf'),
    Militar_ExtraBold: require('../assets/fonts/KaiseiTokumin-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
       {/* <View>
        <ImageBackground source={require('../assets/images/fondo.png')} 
        style={styles.fondo}>
          <View style={styles.overlay} />
        </ImageBackground>
      </View> */}
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  fondo:{
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,  // Cubre todo el ImageBackground
    backgroundColor: '#023D2A',
    opacity: 0.5,  // Nivel de opacidad
  },
});