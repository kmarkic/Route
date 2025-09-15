import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useSearchParams } from 'expo-router';

// Tip za jednu stanicu ili dio rute (ovisno o API-ju)
type RouteStep = {
  instruction: string;
  distance?: string;
  duration?: string;
};

export default function RoutesScreen() {
  const { departure, destination } = useSearchParams<{ departure: string; destination: string }>();
  const [routeData, setRouteData] = useState<RouteStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!departure || !destination) return;

    const fetchRoute = async () => {
      try {
        setLoading(true);

        // ---- API ključ ----
        const API_KEY = '5b3ce3597851110001cf6248fe0e93a6f2dc4aabad0ef3ed941c9df2';

        // Primjer URL-a za OpenRouteService Directions API
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${encodeURIComponent(
          departure
        )}&end=${encodeURIComponent(destination)}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Greška pri dohvaćanju rute');
        }

        const data = await response.json();

        // Ovisno o strukturi API-ja, prilagodi parsiranje
        // Primjer: API vraća listu "steps" s uputama
        const steps: RouteStep[] =
          data?.features?.[0]?.properties?.segments?.[0]?.steps?.map((step: any) => ({
            instruction: step.instruction,
            distance: step.distance,
            duration: step.duration,
          })) || [];

        setRouteData(steps);
      } catch (error) {
        console.error(error);
        Alert.alert('Greška', 'Nije moguće dohvatiti rutu. Provjerite API ključ i unos.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [departure, destination]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ruta od {departure} do {destination}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#155263" style={{ marginTop: 20 }} />
      ) : routeData.length === 0 ? (
        <Text style={styles.noData}>Nema dostupnih uputa za ovu rutu.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {routeData.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text style={styles.stepText}>{index + 1}. {step.instruction}</Text>
              {step.distance && <Text style={styles.subText}>Udaljenost: {step.distance} m</Text>}
              {step.duration && <Text style={styles.subText}>Vrijeme: {step.duration} s</Text>}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  noData: { fontSize: 16, textAlign: 'center', marginTop: 20 },
  scrollContent: { paddingBottom: 40 },
  stepContainer: { marginBottom: 12, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 },
  stepText: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  subText: { fontSize: 14, color: '#555' },
});

