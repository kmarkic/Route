import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import stopsData from '@/assets/gtfs-static/stops.json';
import routesData from '@/assets/gtfs-static/routes.json';

const parseCSV = (text: string) => text.split('\n').map(row => row.split(','));

export default function HomeScreen() {
  const router = useRouter();
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

useEffect(() => {
        console.log('Stops:', stopsData);
        console.log('Routes:', routesData);
}, []);

  // auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [menuOpen, setMenuOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const startVoiceInput = (setter: (text: string) => void) => {
    Alert.alert('Koristite svoj glas za traženje aplikacije Putkom', 'Uključite mikrofon u postavkama\n\n1. Odabir mikrofona\n2. Uključite mikrofon');
  };

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert('Greška', 'Unesite email i lozinku');
      return;
    }
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setEmail('');
    setPassword('');
    Alert.alert('Uspjeh', authMode === 'login' ? 'Prijava uspješna!' : 'Registracija uspješna!');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Navbar */}
      <View style={styles.navBar}>
        <Image source={require('@/assets/images/logo_s.png')} style={styles.navLogo} resizeMode="contain" />
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Burger meni */}
      {menuOpen && (
        <View style={styles.menuDropdown}>
          {!isLoggedIn ? (
            <TouchableOpacity onPress={() => { setShowAuthModal(true); setMenuOpen(false); }}>
              <Text style={styles.menuItem}>Prijava / Registracija</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity onPress={() => Alert.alert('Povijest ruta')}>
                <Text style={styles.menuItem}>Povijest ruta</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('Omiljene rute')}>
                <Text style={styles.menuItem}>Omiljene rute</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
                <Text style={[styles.menuItem, { color: 'red' }]}>Odjava</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Naslov */}
        <View style={styles.section}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Javni prijevoz</ThemedText>
          </ThemedView>
        </View>

        {/* Polazak i dolazak */}
        <View style={styles.section}>
          <ThemedView style={styles.searchRow}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Polazak"
                style={styles.input}
                value={departure}
                onChangeText={setDeparture}
              />
              <TouchableOpacity onPress={() => startVoiceInput(setDeparture)} style={styles.voiceButton}>
                <Ionicons name="mic-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Dolazak"
                style={styles.input}
                value={destination}
                onChangeText={setDestination}
              />
              <TouchableOpacity onPress={() => startVoiceInput(setDestination)} style={styles.voiceButton}>
                <Ionicons name="mic-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                if (!departure || !destination) {
                  Alert.alert('Greška', 'Molimo unesite polazak i dolazak');
                  return;
                }
                router.push(`/routes?departure=${encodeURIComponent(departure)}&destination=${encodeURIComponent(destination)}`);
              }}
            >
              <Text style={styles.searchButtonText}>Pretraži</Text>
            </TouchableOpacity>
          </ThemedView>
        </View>

        {/* Opis aplikacije */}
        <View style={styles.section}>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Najpopularnija aplikacija za urbanu mobilnost u Zagrebu</ThemedText>
            <ThemedText>Sve lokalne mogućnosti mobilnosti u jednoj aplikaciji..</ThemedText>
          </ThemedView>
        </View>

        {/* Footer */}
        <View style={styles.section}>
          <ThemedView style={styles.footerContainer}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com')}>
              <Text style={styles.footerLink}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}>
              <Text style={styles.footerLink}>Facebook</Text>
            </TouchableOpacity>
          </ThemedView>
        </View>
      </ScrollView>

      {/* Auth Modal */}
      <Modal visible={showAuthModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{authMode === 'login' ? 'Prijava' : 'Registracija'}</Text>

            <TextInput
              placeholder="Email"
              style={styles.modalInput}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Lozinka"
              style={styles.modalInput}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.searchButton} onPress={handleAuth}>
              <Text style={styles.searchButtonText}>
                {authMode === 'login' ? 'Prijavi se' : 'Registriraj se'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
              <Text style={styles.switchText}>
                {authMode === 'login'
                  ? 'Nemaš račun? Registriraj se'
                  : 'Već imaš račun? Prijavi se'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowAuthModal(false)}>
              <Text style={styles.closeButtonText}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    backgroundColor: '#155263',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: 15,
  },
  navLogo: {
    height: 60,
    width: 180,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginBottom: 20,
  },
  stepContainer: {
    gap: 8,
  },
  searchRow: {
    gap: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  voiceButton: {
    padding: 10,
    backgroundColor: '#FE5757',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    padding: 12,
    backgroundColor: '#155263',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  footerContainer: {
    alignItems: 'center',
    gap: 10,
  },
  footerLink: {
    color: '#155263',
    fontWeight: '600',
    fontSize: 16,
  },
  menuDropdown: {
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 8,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fafafa',
  },
  switchText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#155263',
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FE5757',
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

});