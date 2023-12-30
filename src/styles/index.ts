import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 14,
    // fontWeight: "bold",
    // fontFamily: "JosefinSans",
    textAlign: "center",
  },

  signupContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 20,
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
    marginBottom: 5,
    elevation: 3,
  },
  icon: {
    marginLeft: 10,
  },
  imageItems: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "green",
    marginRight: 10,
    marginLeft: 10,
    overflow: "hidden",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    borderRadius: 22,
    marginBottom: 5,
  },
  checkboxPos: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10,
  },

  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    backgroundColor: "#F9CF58",
    borderColor: "#14181B",
    borderWidth: 1, // This sets the border width
    borderRadius: 30,
    marginTop: 10
  },
});
