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
    fontSize: 18
  },
  detailsPosterImage:{
    width: 100,
    height: 160,
    borderRadius: 16,
    left: 29,
    right: 251,
    top: 140
  },
  detailsImage:{
    position: "absolute",
    width: "100%",
    height: 210
  },
  avaliacao:{
    position: "absolute",
    zIndex: 2,
    top: 170,
    right: 20,
    padding: 5,
    backgroundColor: "#3e3e3e80",
    borderRadius: 10,
    flexDirection: "row",
    gap: 5
  },
  textAvaliacao:{
    color: "#FFD700"
  }
});
