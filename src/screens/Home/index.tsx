import { FlatList, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import { MagnifyingGlassPlus } from "phosphor-react-native";
import { useState } from "react";
import { api } from "../../services/api";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export function Home() {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);

  const loadMoreData = async () => {
    const response = await api.get("/movie/popular")
    setDiscoveryMovies(response.data.results)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Oque você quer assistir hoje?</Text>
      <View style={styles.containerInput}>
        <TextInput placeholder="Buscar" style={styles.input} />
        <MagnifyingGlassPlus color="#fff" size={25} weight="light" />
      </View>
      <View>
        <FlatList />
      </View>
    </View>
  );
}
