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
    borderWidth: 1,
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
    marginLeft: 0,
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
    marginTop: 10,
  },

  parentContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
  },
  approvalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 10,
  },

  textApprovalPage: {
    fontSize: 16,
  },

  reservationDetails: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    paddingBottom: -10,
  },

  reservationsubDetails: {
    backgroundColor: "rgba(224, 227, 231, 100)",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },

  reservationDetailsSubtext: {
    fontSize: 18,
    padding: 10,
    paddingTop: 5,
    paddingBottom: -10,
  },

  backgroundApprove: {
    // backgroundColor: "rgba(75, 57, 239, 100)",
    backgroundColor: "rgba(36, 150, 137, 0.8)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundReject: {
    backgroundColor: "rgba(255, 89, 99, 1)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundStatus: {
    backgroundColor: "rgba(224, 227, 231, 100)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10, // Change this to your desired border radius
    padding: 20,
    width: "85%",
    height: "65%", // Adjust width as needed
  },

  upload: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
  },

  example: {
    marginVertical: 24,
  },
});
