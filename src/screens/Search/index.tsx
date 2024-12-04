import { FlatList, Text, TextInput, View, Image } from "react-native";
import { styles } from "./styles";
import { MagnifyingGlass, Star } from "phosphor-react-native";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { CardMovies } from "../../components/CardMovies";
import { useNavigation } from "@react-navigation/native";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number; 
  release_date: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

export function Search() {
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);

  // Carrega a lista de gêneros ao iniciar o componente
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get("/genre/movie/list");
        setGenres(response.data.genres); // Armazena os gêneros
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    };

    fetchGenres();
  }, []);

  const searchMovies = async (query: string) => {
    try {
      setLoading(true);
      setNoResult(false);

      const response = await api.get("/search/movie", {
        params: {
          query,
        },
      });
      console.log("Resposta da API:", response.data.results);
      if (response.data.results.length === 0) {
        setNoResult(true);
      } else {
        setSearchResultMovies(response.data.results);
      }
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
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

  const renderMovieItem = ({ item }: { item: Movie }) => {
    const releaseDate = new Date(item.release_date).toLocaleDateString('pt-BR');
  
    const movieGenres = item.genre_ids.map((id) => {
      const genre = genres.find((genre) => genre.id === id);
      return genre ? genre.name : "Gênero desconhecido";
    });
  
    return (
      <View key={item.id} style={styles.movieCard}>
        <CardMovies 
          data={item}
          onPress={() => navigation.navigate('Detalhes', { movieId: item.id })}
        />
        
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.movieRating}>
            <Star color="#FFD700" size={15} weight="light" /> {item.vote_average}
          </Text>
          <Text style={styles.movieInfo}>
            {releaseDate} 
          </Text>
          <Text style={styles.movieInfo}>
            {movieGenres.join(", ")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Buscar"
          style={styles.input}
          onChangeText={handleSearch}
          value={search}
        />
        <MagnifyingGlass color="#fff" size={25} weight="light" />
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : noResult ? (
        <Text>
          Nenhum resultado encontrado para "{search}"
        </Text>
      ) : (
        <FlatList
          data={searchResultMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}
