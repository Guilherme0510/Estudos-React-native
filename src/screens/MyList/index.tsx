import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CaretLeft, ArrowClockwise, Star } from "phosphor-react-native"; // Ícones
import { useNavigation } from "@react-navigation/native";
import { CardMovies } from "../../components/CardMovies";
import { api } from "../../services/api";
import { styles } from "./styles";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  vote_average: string;
  genre_ids: number[]; // Não será mais utilizado
}

export function MyList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const navigate = useNavigation();

  const fetchMovies = async () => {
    try {
      const savedMovies = await AsyncStorage.getItem("@savedMovies");
      console.log("Filmes salvos:", savedMovies); // Logando os filmes salvos
      const moviesList = savedMovies ? JSON.parse(savedMovies) : [];
      setMovies(moviesList);
    } catch (error) {
      console.error("Erro ao carregar filmes salvos:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSaveMovie = async (movie: Movie) => {
    try {
      const savedMovies = await AsyncStorage.getItem("@savedMovies");
      const moviesList = savedMovies ? JSON.parse(savedMovies) : [];

      const isMovieSaved = moviesList.some(
        (item: Movie) => item.id === movie.id
      );

      if (isMovieSaved) {
        const updatedList = moviesList.filter(
          (item: Movie) => item.id !== movie.id
        );
        await AsyncStorage.setItem("@savedMovies", JSON.stringify(updatedList));
      } else {
        await AsyncStorage.setItem(
          "@savedMovies",
          JSON.stringify([...moviesList, movie])
        );
      }

      fetchMovies();
    } catch (error) {
      console.error("Erro ao salvar ou remover filme:", error);
    }
  };

  const renderMovieItem = ({ item }: { item: Movie }) => {
    const releaseDate = new Date(item.release_date).toLocaleDateString("pt-BR");

    return (
      <View key={item.id} >
        <Pressable style={styles.movieCard}
          onPress={() => navigate.navigate("Detalhes", { movieId: item.id })}
        >
          <CardMovies data={item} />
          <View style={styles.movieDetails}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieRating}>
              <Star color="#FFD700" size={15} weight="light" />{" "}
              {item.vote_average}
            </Text>
            <Text style={styles.movieInfo}>{releaseDate}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <CaretLeft size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Minha Lista</Text>
      </View>
      {movies.length === 0 ? (
        <View style={styles.containerEmpty}>
          <Image
            style={styles.emptyBox}
            source={require("../../Assets/caixaVazia.png")}
          />
          <Text style={styles.textEmpty}>Não há filmes em sua lista ainda</Text>
          <Text style={styles.textEmptyMin}>
            Procure por filmes e adicione os seus favoritos aqui!
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
        />
      )}

      <TouchableOpacity style={styles.iconContainer} onPress={fetchMovies}>
        <ArrowClockwise size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}
