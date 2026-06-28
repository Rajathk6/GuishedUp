import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import { searchPosts } from "../api/search";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<any[]>([]);

  async function handleSearch() {
    if (!query.trim()) return;

    try {
      const response = await searchPosts(query);

      setResults(response.data);
    } catch (error: any) {
      console.log("Status:", error?.response?.status);

      console.log("Data:", error?.response?.data);

      console.log("Headers:", error?.response?.headers);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
      />

      <Pressable style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,

    backgroundColor: "#fff",
  },

  input: {
    borderWidth: 1,

    borderRadius: 8,

    padding: 12,

    marginBottom: 12,
  },

  button: {
    backgroundColor: "#007AFF",

    padding: 12,

    borderRadius: 8,

    alignItems: "center",

    marginBottom: 20,
  },

  buttonText: {
    color: "white",

    fontWeight: "bold",
  },

  card: {
    padding: 16,

    backgroundColor: "#F5F5F5",

    marginBottom: 10,

    borderRadius: 8,
  },
});
