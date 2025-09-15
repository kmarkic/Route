
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { searchItems } from '../services/api';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      setLoading(true);
      setError(null);
      try {
        const results = await searchItems(text);
        setSearchResults(results);
      } catch (err) {
        setError('Došlo je do greške prilikom pretrage.');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pretraži..."
        value={query}
        onChangeText={handleSearch}
      />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {error && (
        <Text style={{ color: 'red', marginTop: 20, textAlign: 'center' }}>{error}</Text>
      )}
      {!loading && !error && searchResults.length === 0 && query.length > 2 && (
        <Text style={{ marginTop: 20, textAlign: 'center' }}>Nema rezultata za "{query}"</Text>
      )}

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.result}>{item.name || JSON.stringify(item)}</Text>
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  result: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
