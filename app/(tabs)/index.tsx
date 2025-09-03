import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput, Button } from "react-native";
import { Text, TouchableOpacity, Linking } from "react-native";


export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#155263', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/navbar.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Javni prijevoz</ThemedText>
      </ThemedView>
      {/* Novi red za unos Polazak i Dolazak + gumb */}
      <ThemedView style={styles.searchRow}>
        <TextInput
          placeholder="Polazak"
          style={styles.input}
        />
        <TextInput
          placeholder="Dolazak"
          style={styles.input}
        />
        <Button title="Pretraži" onPress={() => {}} color="#155263" />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.footerContainer}>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com')}>
                <Text style={styles.footerLink}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.moovitapp.com')}>
                <Text style={styles.footerLink}>Moovit</Text>
              </TouchableOpacity>
            </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
      width: "100%",
      height: 150,
      resizeMode: "cover",
      alignSelf: 'center',   // centriraj unutar roditelja
      marginTop: 0,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
  },
  footerContainer: {
    marginTop: 20,
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    gap: 8,
  },
  footerLink: {
    color: "#155263",
    fontWeight: "600",
    fontSize: 16,
  },


});
