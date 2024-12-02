import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { api } from "../../services/api";
import { styles } from "./styles";
import {
  BookBookmark,
  BookmarkSimple,
  Calendar,
  CalendarBlank,
  CaretLeft,
  ClockCountdown,
  Star,
} from "phosphor-react-native";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  vote_average: string;
  genre_ids: number[];
};

type RouterProps = {
  movieId: number;
};

type Genre = {
  id: number;
  name: string;
};

export function Details() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]); // Estado para armazenar a lista de gêneros
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { movieId } = route.params as RouterProps;

  // Função para pegar a lista de gêneros
  const fetchGenres = async () => {
    try {
      const response = await api.get("/genre/movie/list"); // Endpoint para pegar os gêneros
      console.log("Gêneros recebidos:", response.data.genres); // Log para verificar a resposta dos gêneros
      setGenres(response.data.genres);
    } catch (error) {
      console.log("Erro ao carregar gêneros:", error);
    }
  };

  // Carregar detalhes do filme
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieId}`);
        console.log("Detalhes do filme:", response.data); // Log para verificar os dados do filme
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Erro ao carregar detalhes do filme:", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  // Chamar fetchGenres uma vez
  useEffect(() => {
    fetchGenres();
  }, []);

  // Função para pegar os nomes dos gêneros com base nos IDs
  const getFirstGenreName = (genres: { id: number; name: string }[]) => {
    if (genres.length > 0) {
      return genres[0].name; // Retorna o nome do primeiro gênero
    }
    return ""; // Caso não haja gênero, retorna uma string vazia
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes</Text>
        <TouchableOpacity>
          <BookmarkSimple color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          style={styles.detailsImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`,
          }}
        />
        <View style={styles.avaliacao}>
          <Star color="#FFD700" size={20} weight="light" />
          <Text style={styles.textAvaliacao}>
            {movieDetails?.vote_average
              ? parseFloat(movieDetails.vote_average).toFixed(2)
              : "N/A"}
          </Text>
        </View>

        <Image
          style={styles.detailsPosterImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
          }}
        />
        <Text style={styles.titleMovie}>{movieDetails?.title}</Text>
      </View>
      <View style={styles.infosMovie}>
        <CalendarBlank color="#fff" size={16} weight="light" />
        <Text style={styles.infoText}>{movieDetails?.release_date}</Text>
        <Text style={styles.separator}>|</Text>
        <ClockCountdown color="#fff" size={16} weight="light" />
        <Text style={styles.infoText}>{movieDetails?.runtime} min</Text>
        <Text style={styles.separator}>|</Text>
        <CalendarBlank color="#fff" size={16} weight="light" />
        <Text style={styles.infoText}>{getFirstGenreName(genres || [])}</Text>
      </View>
      <View style={styles.infoAdicionais}>
        <View style={styles.headerInfoAdicionais}>
          <TouchableOpacity>
            <Text>Sobre o filme</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Avaliações</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Elenco</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
