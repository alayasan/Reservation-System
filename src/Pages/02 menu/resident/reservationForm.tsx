import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "react-native-check-box";
import styles from "../../../styles";
import { NavProps } from "../../../interface/navProps";
import { ActivityIndicator, DefaultTheme, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { push, ref, set } from "firebase/database";
import {
  FIREBASE_AUTH,
  FIREBASE_DATABASE,
  FIREBASE_DB,
} from "../../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ReservationPage = ({ navigation }: NavProps) => {
  const [borrowDate, setBorrowDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [borrowShow, setBorrowShow] = useState(false);
  const [returnShow, setReturnShow] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [activePhonenumber, setActivePhonenumber] = useState("");
  const [borrower, setBorrower] = useState("");
  const [address, setAddress] = useState("");
  const [venue, setVenue] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"date" | "time" | "datetime" | "countdown">(
    "date"
  );

  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [quantity1, setQuantity1] = useState("");
  const [quantity2, setQuantity2] = useState("");

  const [getUser, setGetUser] = useState(null);
  const user = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    const fetchUser = async () => {
      const getUser = FIREBASE_AUTH.currentUser;

      if (getUser) {
        const docRef = doc(FIREBASE_DB, "users", getUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGetUser(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUser();
  }, []);

  const onChangeBorrow = (e: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || borrowDate;
    setBorrowShow(false);
    setBorrowDate(currentDate);
    setReturnDate(currentDate);
  };

  const onChangeReturn = (e: any, selectedDate: Date | undefined) => {
    setReturnShow(false);
    setReturnDate(selectedDate || returnDate);
  };

  const showBorrowMode = () => {
    setBorrowShow(true);
    setReturnShow(false); // Close the return date picker if open
    setMode("date");
  };

  const showReturnMode = () => {
    setReturnShow(true);
    setBorrowShow(false); // Close the borrow date picker if open
    setMode("date");
  };

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
    if (!isChecked1) {
      setModalVisible1(true);
    }
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
    if (!isChecked2) {
      setModalVisible2(true);
    }
  };

  const handleModalClose1 = () => {
    if (quantity1 === "" || isNaN(quantity1) || quantity1 === "0") {
      Alert.alert(
        "Please enter a valid number for the quantity of Monobloc Chairs."
      );
    } else {
      setModalVisible1(false);
    }
  };

  const handleModalClose2 = () => {
    if (quantity2 === "" || isNaN(quantity2) || quantity2 === "0") {
      Alert.alert("Please enter a valid number for the quantity of Tents.");
    } else {
      setModalVisible2(false);
    }
  };

  const handleSubmit = async () => {
    if (!venue || !purpose || !borrowDate || !returnDate) {
      console.error("All fields are required.");
      setIsButtonDisabled(true);
      return;
    }
    setIsButtonDisabled(false);
    setIsLoading(true);
    if (user) {
      try {
        // Generate a new child location using push() and save the reservation form data
        const newReservationRef = push(
          ref(FIREBASE_DATABASE, `reservations/${user.uid}`)
        );
        await set(newReservationRef, {
          borrower: `${getUser?.firstname} ${getUser?.lastname}`,
          address: `${getUser?.address}`,
          phonenumber: `${getUser?.phonenumber}`,
          venue,
          purpose,
          borrowDate: borrowDate.toLocaleDateString(),
          returnDate: returnDate.toLocaleDateString(),
          status: "pending",
          type: "resident",
          items: {
            monoblocChair: isChecked1 ? quantity1 : 0,
            tent: isChecked2 ? quantity2 : 0,
            soundSystem: isChecked3,
            serviceVehicle: isChecked4,
          },
          timestamp: new Date().toISOString(),
        });

        console.log(
          "Reservation form submitted with ID: ",
          newReservationRef.key
        );
        console.log("user id: ", user.uid);
        console.log("current time: ", new Date().toISOString());
        Alert.alert(
          "Success ✅",
          `Your reservation form has been submitted successfully. Your reservation ID is ${newReservationRef.key}.`,
          [
            {
              text: "Great!",
              onPress: () => navigation.navigate("Status"),
            },
          ]
        );
      } catch (error) {
        console.error("Error writing to Firebase Realtime Database:", error);
        Alert.alert("Error ❌", "Failed to submit your reservation form.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("No user is signed in.");
      setIsLoading(false);
    }
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: activePhonenumber ? "green" : "red",
    },
  };

  useEffect(() => {
    if (borrower && address && purpose && borrowDate && returnDate) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [borrower, address, purpose, borrowDate, returnDate]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            alignContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 20,
            }}
          >
            <Text style={{ fontSize: 14 }}>Please fill up the form below.</Text>
          </View>
          <TextInput
            label="Name of Borrower"
            value={getUser ? `${getUser.firstname} ${getUser.lastname}` : ""}
            editable={false}
            // value={borrower}
            style={[styles.textInput, { width: "100%", height: 60 }]}
            onChangeText={(borrower) => setBorrower(borrower)}
          ></TextInput>

          <TextInput
            label="Address"
            value={getUser ? `${getUser.address}` : ""}
            editable={false}
            style={[styles.textInput, { width: "100%", height: 100 }]}
            multiline={true}
            numberOfLines={4}
            onChangeText={(address) => setAddress(address)}
          ></TextInput>

          <TextInput
            label="Contact Number"
            value={getUser ? `${getUser.phonenumber}` : ""}
            editable={false}
            style={[styles.textInput, { width: "100%", height: 70 }]}
            onChangeText={(activePhonenumber) =>
              setActivePhonenumber(activePhonenumber)
            }
          ></TextInput>

          <TextInput
            label="Venue"
            onChangeText={(VenueInput) => setVenue(VenueInput)}
            style={[styles.textInput, { width: "100%", height: 70 }]}
            value={venue}
          />

          <TextInput
            label="Purpose/Reason to Borrow"
            value={purpose}
            style={[styles.textInput, { width: "100%", height: 100 }]}
            multiline
            numberOfLines={3}
            onChangeText={(purpose) => setPurpose(purpose)}
          ></TextInput>
          <Text
            style={{
              fontSize: 16,
              paddingTop: 10,
              paddingBottom: 10,
              fontWeight: "bold",
            }}
          >
            Date of Borrowing:                      Date of Return:
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: 120 }}>
              <Button
                title={borrowDate.toLocaleDateString()}
                onPress={showBorrowMode}
                color="black"
              />
              {borrowShow && (
                <DateTimePicker
                  testID="dateTimePickerBorrow"
                  value={borrowDate}
                  mode={mode}
                  minimumDate={new Date()}
                  // display="default"
                  onChange={onChangeBorrow}
                />
              )}
            </View>
            <View style={{ width: 120 }}>
              <Button
                title={returnDate.toLocaleDateString()}
                onPress={showReturnMode}
                color="black"
              />
              {returnShow && (
                <DateTimePicker
                  testID="dateTimePickerReturn"
                  value={returnDate}
                  mode={mode}
                  minimumDate={borrowDate}
                  // display="default"
                  onChange={onChangeReturn}
                />
              )}
            </View>
          </View>
          <Text
            style={{
              marginRight: 10,
              paddingTop: 20,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Select items to borrow:
          </Text>

          <View style={[styles.checkboxContainer]}>
            <View style={[styles.imageItems]}>
              <Image
                source={require("../../../assets/images/monobloc.png")}
                style={{ width: 60, height: 60 }}
              />
            </View>
            <Text style={{ fontSize: 16 }}>Monobloc Chair</Text>
            <View style={[styles.checkboxPos]}>
              <Checkbox
                isChecked={isChecked1}
                onClick={handleCheckboxChange1}
                checkedCheckBoxColor="green"
                uncheckedCheckBoxColor="black"
                rightText={"Monobloc Chair"}
              />
              {isChecked1 && (
                <Text style={{ fontSize: 10 }}>Quantity: {quantity1}</Text>
              )}
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible1}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text>Enter quantity:</Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      marginVertical: 10,
                    }}
                    onChangeText={setQuantity1}
                    value={quantity1}
                    keyboardType="numeric"
                  />
                  <Button title="OK" onPress={handleModalClose1} />
                </View>
              </View>
            </Modal>
          </View>

          <View style={[styles.checkboxContainer]}>
            <View style={[styles.imageItems]}>
              <Image
                source={require("../../../assets/images/tent.jpg")}
                style={{ width: 60, height: 60 }}
              />
            </View>
            <Text style={{ fontSize: 16 }}>Tent</Text>
            <View style={[styles.checkboxPos]}>
              <Checkbox
                isChecked={isChecked2}
                onClick={handleCheckboxChange2}
                checkedCheckBoxColor="green"
                uncheckedCheckBoxColor="black"
                rightText={"Tent"}
              />
              {isChecked2 && (
                <Text style={{ fontSize: 10 }}>Quantity: {quantity2}</Text>
              )}
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible2}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text>Enter quantity:</Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      marginVertical: 10,
                    }}
                    onChangeText={setQuantity2}
                    value={quantity2}
                    keyboardType="numeric"
                  />
                  <Button title="OK" onPress={handleModalClose2} />
                </View>
              </View>
            </Modal>
          </View>

          <View style={[styles.checkboxContainer]}>
            <View style={[styles.imageItems]}>
              <Image
                source={require("../../../assets/images/soundsystem.jpg")}
                style={{ width: 60, height: 60 }}
              />
            </View>
            <Text style={{ fontSize: 16 }}>Sound System</Text>
            <View style={[styles.checkboxPos]}>
              <Checkbox
                isChecked={isChecked3}
                onClick={() => setIsChecked3(!isChecked3)}
                checkedCheckBoxColor="green"
                uncheckedCheckBoxColor="black"
                rightText={"Sound System"}
              />
            </View>
          </View>
          <View style={[styles.checkboxContainer]}>
            <View style={[styles.imageItems]}>
              <Image
                source={require("../../../assets/images/servicecar.jpg")}
                style={{ width: 60, height: 60 }}
              />
            </View>
            <Text style={{ fontSize: 16 }}>Service Vehicle</Text>
            <View style={[styles.checkboxPos]}>
              <Checkbox
                isChecked={isChecked4}
                onClick={() => setIsChecked4(!isChecked4)}
                checkedCheckBoxColor="green"
                uncheckedCheckBoxColor="black"
                rightText={"Service Car"}
              />
            </View>
          </View>
          <View style={{ alignItems: "center", flex: 1 }}>
            {isLoading && (
              <ActivityIndicator size="large" color="rgba(249, 207, 88, 1)" />
            )}
            <TouchableOpacity
              style={[styles.submitButton]}
              disabled={!venue || !purpose || !borrowDate || !returnDate}
              onPress={() => {
                if (!(isChecked1 || isChecked2 || isChecked3 || isChecked4)) {
                  Alert.alert(
                    "No reserved items.",
                    "Please check at least one item you want to borrow.",
                    [
                      {
                        text: "OK",
                        style: "cancel",
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  Alert.alert(
                    "Confirmation",
                    "Are you sure you want to submit this reservation?",
                    [
                      {
                        text: "No",
                        style: "cancel",
                      },
                      {
                        text: "Yes",
                        onPress: () => {
                          setIsLoading(true);
                          handleSubmit();
                        },
                      },
                    ]
                  );
                }
              }}
            >
              <Text
                style={{
                  color: "#14181B",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default ReservationPage;
