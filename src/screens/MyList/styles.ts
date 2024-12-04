import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1e1e1e",
        paddingTop: 25
      },
      header: {
        paddingBlock: 50,
        paddingInline: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      textHeader: {
        color: "#FFF",
        fontSize: 20,
        letterSpacing: 3,
        fontWeight: "700",
        textAlign: "center",
        flex: 1,
      },
      containerEmpty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
      },
      emptyBox: {
        width: "50%",
        height: "20%",
      },
      textEmpty: {
        color: "#FFF",
        fontSize: 18,
        letterSpacing: 1.2,
      },
      textEmptyMin: {
        color: "grey",
        width: "50%",
        textAlign: "center",
      },
      movieImage: {
        width: 120,
        height: 180,
        borderRadius: 8,
        marginBottom: 10,
      },
      iconContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#0066cc",
        padding: 10,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
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
})