import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242a32",
    padding: 25,
  },
  containerInput: {
    backgroundColor: "#67686d",
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 16,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    color: "#fff",
    width: "80%",
  },
  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  movieCard:{
    flexDirection:"row",
    gap: 10,
    marginBottom: 30
  },
  moviePoster:{
    height: 150,
    width:100
  },
  movieDetails:{
    gap:4
  },
  movieTitle:{
    color:"#FFF",
    fontSize:16,
    fontWeight: "600",
    marginBottom: 40
  },
  movieRating:{
    color: "#FFD700",
    fontSize: 15
  },
  movieInfo:{
    color: "#fff"
  }
});
