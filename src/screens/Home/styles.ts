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
    textAlign: "center",
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
    flexDirection: "row",
    gap: 10,
  },
  input: {
    color: "#fff",
    width: "80%",
  },
  picker: {
    width: "100%",
    backgroundColor: "#67686d",
    borderRadius: 16,
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
  },
});
