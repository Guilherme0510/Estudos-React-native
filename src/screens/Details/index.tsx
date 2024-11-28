import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../services/api";
import { styles } from "./styles";
import {
  BookBookmark,
  BookmarkSimple,
  CaretLeft,
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
};

type RouterProps = {
  movieId: number;
};

export function Details() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails>(null);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { movieId } = route.params as RouterProps;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieId}`);
        setMovieDetails(response.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

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
      </View>
    </View>
  );
}
