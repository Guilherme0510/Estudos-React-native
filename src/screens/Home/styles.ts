import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242a32",
    padding: 25,
  },
  headerText: {
    marginTop: 30,
    fontSize: 24,
    lineHeight: 45,
    color: "#fff",
    textAlign: "center"
  },
  containerInput: {
    backgroundColor: "#67686d",
    paddingBlock: 3,
    paddingInline: 15,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  input:{
    color: '#fff',
    width: "80%"
  }
});
