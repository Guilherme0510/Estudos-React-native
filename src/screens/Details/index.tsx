import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";
import { styles } from "./styles";
import {
  BookmarkSimple,
  BookmarksSimple,
  CalendarBlank,
  CaretLeft,
  ClockCountdown,
  Star,
} from "phosphor-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

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

type Review = {
  id: string;
  author: string;
  content: string;
  author_details: { rating: number };
};

type Cast = {
  id: number;
  name: string;
  profile_path: string;
};

export function Details() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("sobre"); // Default section
  const [movieReviews, setMovieReviews] = useState<Review[]>([]);
  const [movieCast, setMovieCast] = useState<Cast[]>([]);

  const route = useRoute();
  const { movieId } = route.params as RouterProps;
  const navigate = useNavigation();

  const fetchGenres = async () => {
    try {
      const response = await api.get("/genre/movie/list");
      setGenres(response.data.genres);
    } catch (error) {
      console.log("Erro ao carregar gêneros:", error);
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieId}`);
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Erro ao carregar detalhes do filme:", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await api.get(`/movie/${movieId}/reviews`);
        setMovieReviews(response.data.results);
      } catch (error) {
        console.log("Erro ao carregar avaliações:", error);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const response = await api.get(`/movie/${movieId}/credits`);
        setMovieCast(response.data.cast);
      } catch (error) {
        console.log("Erro ao carregar elenco:", error);
      }
    };

    fetchMovieReviews();
    fetchMovieCast();
  }, [movieId]);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const savedMovies = await AsyncStorage.getItem("@savedMovies");
        const moviesList = savedMovies ? JSON.parse(savedMovies) : [];
        const alreadySaved = moviesList.some(
          (movie: MovieDetails) => movie.id === movieId
        );
        setIsSaved(alreadySaved);
      } catch (error) {
        console.error("Erro ao verificar se o filme está salvo:", error);
      }
    };

    checkIfSaved();
  }, [movieId]);

  const handleSaveMovie = async () => {
    try {
      // Verifica os filmes salvos no AsyncStorage
      const savedMovies = await AsyncStorage.getItem("@savedMovies");
      console.log("Filmes salvos:", savedMovies); // Depuração
  
      const moviesList = savedMovies ? JSON.parse(savedMovies) : [];
      console.log("Lista de filmes:", moviesList); // Depuração
  
      if (isSaved) {
        const updatedList = moviesList.filter(
          (movie: MovieDetails) => movie.id !== movieId
        );
        console.log("Lista de filmes após remoção:", updatedList); // Depuração
  
        await AsyncStorage.setItem("@savedMovies", JSON.stringify(updatedList));
        setIsSaved(false);
        console.log("Filme removido com sucesso"); // Depuração
      } else {
        const newMovie = {
          id: movieDetails?.id,
          title: movieDetails?.title,
          poster_path: movieDetails?.poster_path,
          backdrop_path: movieDetails?.backdrop_path,
          release_date: movieDetails?.release_date,
          vote_average: movieDetails?.vote_average,
        };
        console.log("Novo filme a ser salvo:", newMovie); // Depuração
  
        await AsyncStorage.setItem(
          "@savedMovies",
          JSON.stringify([...moviesList, newMovie])
        );
        setIsSaved(true);
        console.log("Filme salvo com sucesso"); // Depuração
      }
    } catch (error) {
      console.error("Erro ao salvar ou remover filme:", error);
    }
  };
  

  const getFirstGenreName = (genres: Genre[]) => {
    return genres.length > 0 ? genres[0].name : "";
  };

  const renderSection = () => {
    switch (activeSection) {
      case "sobre":
        return (
          <View style={styles.containerDescricao}>
            <Text style={styles.descricao}>{movieDetails?.overview}</Text>
          </View>
        );
      case "avaliacao":
        return movieReviews.length > 0 ? (
          movieReviews.slice(0, 3).map((review) => (
            <View key={review.id} style={styles.reviews}>
              <View style={styles.reviewRating}>
                <Image
                  style={styles.reviewRatingImage}
                  source={require("../../Assets/perfil-user.png")}
                />
                <Text style={styles.reviewRatingNota}>
                  {review.author_details.rating.toFixed(1)}
                </Text>
              </View>
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewInfoTextHeader}>{review.author}</Text>
                <Text style={styles.reviewInfoText}>
                  {review.content.slice(0, 150)}
                  {review.content.length > 150 && "..."}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.missingRating}>
            Não há avaliações disponíveis para este filme.
          </Text>
        );
      case "elenco":
        return (
          <FlatList
            data={movieCast.slice(0, 10)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => ( 
              <View style={styles.cast}>
                <Image
                  style={styles.castImage}
                  source={{
                    uri: item.profile_path
                      ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                      : "https://via.placeholder.com/200x300.png?text=Sem+Imagem",
                  }}
                />
                <Text style={styles.castName}>{item.name}</Text>
              </View>
            )}
            numColumns={2}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes</Text>
        <TouchableOpacity onPress={handleSaveMovie}>
          {isSaved ? (
            <BookmarksSimple color="#FFD700" size={32} weight="fill" />
          ) : (
            <BookmarkSimple color="#fff" size={32} weight="thin" />
          )}
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
        <CalendarBlank color="#9A9A9A" size={16} weight="fill" />
        <Text style={styles.infoText}>{movieDetails?.release_date}</Text>
        <Text style={styles.separator}>|</Text>
        <ClockCountdown color="#9A9A9A" size={16} weight="fill" />
        <Text style={styles.infoText}>{movieDetails?.runtime} min</Text>
        <Text style={styles.separator}>|</Text>
        <CalendarBlank color="#9A9A9A" size={16} weight="fill" />
        <Text style={styles.infoText}>{getFirstGenreName(genres || [])}</Text>
      </View>
      <View style={styles.infoAdicionais}>
        <View style={styles.headerInfoAdicionais}>
          <TouchableOpacity
            onPress={() => setActiveSection("sobre")}
            style={[activeSection === "sobre" && styles.activeSection]}
          >
            <Text style={styles.textInfoAdicionais}>Sobre o filme</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveSection("avaliacao")}
            style={[activeSection === "avaliacao" && styles.activeSection]}
          >
            <Text style={styles.textInfoAdicionais}>Avaliações</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveSection("elenco")}
            style={[activeSection === "elenco" && styles.activeSection]}
          >
            <Text style={styles.textInfoAdicionais}>Elenco</Text>
          </TouchableOpacity>
        </View>
  
        {renderSection()}
      </View>
    </ScrollView>
  );
  
}
