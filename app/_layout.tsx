import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../redux/store';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache()
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Starjedi: require('../assets/fonts/Starjedi.ttf'),
    Starjout: require('../assets/fonts/Starjout.ttf'),
    Starjhol: require('../assets/fonts/Starjhol.ttf'),
    Strjmono: require('../assets/fonts/Stjldbl1.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <ThemeProvider value={DarkTheme}>
            <Stack>
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
              <Stack.Screen name="movie" options={{ headerTitle: 'Movie' }} />
              <Stack.Screen name="character" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
