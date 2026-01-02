// eslint-disable-next-line import/no-unresolved
import { AuthProvider} from "@/lib/auth-context";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "@/global.css";
import {  View } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/store/index";
import ContextRedux from "@/components/contextRedux";
import { StatusBar } from 'expo-status-bar';
// import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

function RouteGuard({ children }: { children: React.ReactNode }) {
  //   const [fontsLoaded] = useFonts({
  //     Inter_400Regular,
  //     Inter_700Bold,
  //   });

  //  if (!fontsLoaded) {
  //     return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  //   }
  // const {  isLoadingUser } = useAuth();
  // const router = useRouter();
  // const segments = useSegments();
  // const {token} = useAuth();

  // useEffect(() => {
  //   const inAuthGroup = segments[0] === "login";
  //   // if (!token && !inAuthGroup) {
  //   //   setTimeout(() => {
  //   //     router.replace("/login");
  //   //   }, 0);
  //   // }

  //   // if (token) {
  //   //   setTimeout(() => {
  //   //     router.replace("/");
  //   //   }, 0);
  //   // }
  // }, [router, segments,token,]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <StatusBar hidden/>
        <View style={{ flex: 1 }}>
          <ContextRedux />
          <PaperProvider>
            <SafeAreaProvider>
              <RouteGuard>
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="login" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="product-details"
                    options={{
                      headerShown: true,
                      headerTitleAlign: "center",
                      // headerTransparent: true,
                      // headerTintColor: "#f5f5f5",
                      headerShadowVisible: false,
                      headerStyle: {
                        backgroundColor: '#f5f5f7'
                      }
                      // headerBackButtonDisplayMode: 'minimal',
                      //  presentation: 'formSheet'
                    }}
                  />
                  <Stack.Screen
                    name="checkout"
                    options={{
                      title: 'Checkout',
                      headerShown: true,
                      headerTitleAlign: "center",
                      headerShadowVisible: false,
                      headerStyle: {
                        backgroundColor: '#f5f5f7'
                      }
                    }}
                  />
                </Stack>
              </RouteGuard>
            </SafeAreaProvider>
          </PaperProvider>
        </View>
      </Provider>
    </AuthProvider>
  );
}
