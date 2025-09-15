import { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';

export default function AppSplashScreen() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Sprječava automatsko skrivanje splash-a
        await SplashScreen.preventAutoHideAsync();

        // Ovdje možeš učitati resurse ako treba
        setIsReady(true);

        // Nakon 2 sekunde idemo na glavni screen
        setTimeout(async () => {
          await SplashScreen.hideAsync();
          router.replace("/(tabs)");
        }, 2000);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    // dok se splash ne pripremi, renderamo bijelu pozadinu
    return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  logo: { width: 250, height: 250 },
});
