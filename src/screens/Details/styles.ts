import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  header: {
    paddingTop: 30,
    height: 115,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  detailsPosterImage: {
    width: 100,
    height: 160,
    borderRadius: 16,
    left: 29,
    right: 251,
    top: 140,
  },
  detailsImage: {
    position: "absolute",
    width: "100%",
    height: 210,
  },
  avaliacao: {
    position: "absolute",
    zIndex: 2,
    top: 170,
    right: 20,
    padding: 5,
    backgroundColor: "#3e3e3e80",
    borderRadius: 10,
    flexDirection: "row",
    gap: 5,
  },
  textAvaliacao: {
    color: "#FFD700",
  },
  titleMovie: {
    width: "50%",
    left: 135,
    top: 60,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  infosMovie: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 140,
    width: "100%",
    flexDirection: "row",
    gap: 14,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#9A9A9A",
  },
  separator: {
    fontSize: 14,
    color: "#d3d3d3",
  },
  infoAdicionais: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfoAdicionais: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    width: "80%",
  },
  textInfoAdicionais: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "400",
    marginBottom: 10,
  },
  activeSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#9a9a9a",
    borderRadius: 10
  },

  containerDescricao: {
    paddingTop: 20,
    width: "80%",
  },
  descricao: {
    color: "#fff",
    lineHeight: 17,
    fontSize: 14,
    fontWeight: "300",
  },
  reviews: {
    paddingTop: 20,
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "65%",
    gap: 20,
  },
  reviewRating: {
    flexDirection: "column",
    alignItems: "center",
    gap: 7,
  },
  reviewRatingImage: {
    width: 50,
    height: 50,
  },
  reviewRatingNota: {
    color: "#0296E5",
  },
  reviewInfo: {
    gap: 3,
  },
  reviewInfoTextHeader: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "400",
  },
  reviewInfoText: {
    color: "#fff",
    fontWeight: "300",
  },
  missingRating:{
    color: "red",
    paddingTop: 20
  },
  cast: {
    alignItems: "center",
    marginInline: 30,
    marginBlock: 10
  },
  castImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 5,
  },
  castName:{
    color:"#FFF",
    textAlign:"center"
  }
  
});
