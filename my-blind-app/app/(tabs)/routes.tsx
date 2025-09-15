// app/(tabs)/routes.tsx
import { useSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function RoutesScreen() {
  const { departure, destination } = useSearchParams<{ departure: string; destination: string }>();
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://tvoj-api.com/routes?from=${encodeURIComponent(departure)}&to=${encodeURIComponent(destination)}`
        );
        const data = await response.json();
        setRoutes(data.routes || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (departure && destination) fetchRoutes();
  }, [departure, destination]);

  if (loading) return (
    <View style={styles.center}><ActivityIndicator size="large" color="#155263" /></View>
  );

  if (routes.length === 0) return (
    <View style={styles.center}><Text>Nema dostupnih ruta za odabrane lokacije.</Text></View>
  );

  return (
    <FlatList
      data={routes}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.routeCard}>
          <Text style={styles.routeText}>{item.name}</Text>
        </View>
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  routeCard: { padding: 12, marginBottom: 8, backgroundColor: '#f0f0f0', borderRadius: 8 },
  routeText: { fontSize: 16 },
});




