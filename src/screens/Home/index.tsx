import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./styles";
import { MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { CardMovies } from "../../components/CardMovies";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  popularity: number;
}

export function Home() {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"maisPopular" | "menosPopular" | "">("");

  const loadMoreData = async () => {
    setLoading(true);

    const endpoint = "/movie/popular"; // Use o endpoint padrão para popular

    const response = await api.get<{ results: Movie[] }>(endpoint, {
      params: { page },
    });

    let movies = response.data.results;

    // Aplicar o filtro
    if (filter === "menosPopular") {
      movies = movies.sort((a, b) => a.popularity - b.popularity); // Crescente
    } else if (filter === "maisPopular") {
      movies = movies.sort((a, b) => b.popularity - a.popularity); // Decrescente
    }

    setDiscoveryMovies((prev) => [...prev, ...movies]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };
  
  

  const searchMovies = async (query: string) => {
    setLoading(true);

    const response = await api.get("/search/movie", {
      params: {
        query,
      },
    });
    console.log(response.data.result);
    console.log(response.data);

    if (response.data.results.length === 0) {
      setNoResult(true);
    } else {
      setSearchResultMovies(response.data.results);
    }
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 0) {
      searchMovies(text);
    } else {
      setSearchResultMovies([]);
      setNoResult(false);
    }
  };

  const navigation = useNavigation()

  const renderMovieItem = ({item} : {item: Movie}) => (
    <CardMovies 
      data={item}
      onPress={() => navigation.navigate('Detalhes', { movieId: item.id })}

    />
  )

  const movieData = search.length > 0 ? searchResultMovies : discoveryMovies;

  useEffect(() => {
    setPage(1);
    setDiscoveryMovies([]);
    loadMoreData();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Oque você quer assistir hoje?</Text>
      {/* <View style={styles.containerInput}>
        <TextInput
          placeholder="Buscar"
          style={styles.input}
          onChangeText={handleSearch}
          value={search}
        />
        <MagnifyingGlass color="#fff" size={25} weight="light"  />
      </View> */}
      <View style={styles.picker}>
        <Picker
          selectedValue={filter}
          onValueChange={(itemValue) => setFilter(itemValue)}
        >
          <Picker.Item label="Todos os Filmes" value="" />
          <Picker.Item label="Mais Popular" value="maisPopular" />
          <Picker.Item label="Menos Popular" value="menosPopular" />
        </Picker>
      </View>
      <View>
        {noResult && <Text>Nenhum resultado encontrado para "{search}"</Text>}
        <FlatList
          data={movieData}
          numColumns={3}
          renderItem={renderMovieItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            paddingBottom: 120,
          }}
          onEndReached={() => loadMoreData()}
          onEndReachedThreshold={0.5}
        />
        {loading && <ActivityIndicator size={50} color="#0296e5" />}
      </View>
    </View>
  );
}
