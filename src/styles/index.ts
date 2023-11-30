import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
  button: {
    width: "80%",
    height: 45,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    fontFamily: "JosefinSans",
  },
  headlineText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "JosefinSans",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  textInput: {
    width: "80%",
    height: 45,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 3,
  },
  icon: {
    marginLeft: 10,
  },
});
