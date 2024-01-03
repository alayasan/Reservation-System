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
} from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "react-native-check-box";
import styles from "../../../styles";
import { NavProps } from "../../../interface/navProps";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { push, ref, set } from "firebase/database";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../../firebaseConfig";


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
  const [purpose, setPurpose] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"date" | "time" | "datetime" | "countdown">(
    "date"
  );
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;

  const onChangeBorrow = (e: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || borrowDate;
    setBorrowShow(false);
    setBorrowDate(currentDate);
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

  const handleSubmit = async () => {
    if (!borrower || !address || !purpose || !borrowDate || !returnDate) {
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
          borrower,
          address,
          purpose,
          borrowDate: borrowDate.toLocaleDateString(),
          returnDate: returnDate.toLocaleDateString(),
          activePhonenumber,
          status: "pending",
          type: "resident",
          items: {
            monoblocChair: isChecked1,
            tent: isChecked2,
            soundSystem: isChecked3,
            serviceVehicle: isChecked4,
          },

        });

        console.log(
          "Reservation form submitted with ID: ",
          newReservationRef.key
        );
        Alert.alert(
          "Success ✅",
          `Your reservation form has been submitted successfully. Your reservation ID is ${newReservationRef.key}.`,
          [
            {
              text: "Go to Main Menu",
              onPress: () => navigation.navigate("ResidentMenu"),
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
            value={borrower}
            style={[styles.textInput, { width: "100%", height: 60 }]}
            onChangeText={(borrower) => setBorrower(borrower)}
          ></TextInput>
          <TextInput
            label="Address"
            value={address}
            style={[styles.textInput, { width: "100%", height: 70 }]}
            multiline
            numberOfLines={2}
            onChangeText={(address) => setAddress(address)}
          ></TextInput>
          <TextInput
            label="Active Phone Number"
            value={activePhonenumber}
            style={[styles.textInput, { width: "100%", height: 70 }]}
            onChangeText={(activePhonenumber) => setActivePhonenumber(activePhonenumber)}
            keyboardType="number-pad"
            maxLength={11}
          ></TextInput>
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
                onClick={() => setIsChecked1(!isChecked1)}
                checkedCheckBoxColor="green"
                uncheckedCheckBoxColor="black"
              />
            </View>
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
                onClick={() => setIsChecked2(!isChecked2)}
                checkedCheckBoxColor="green"
                uncheckedCheckBoxColor="black"
              />
            </View>
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
              />
            </View>
          </View>
          <View style={{ alignItems: "center", flex: 1 }}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                { opacity: isButtonDisabled ? 0.5 : 1 },
              ]}
              disabled={
                !borrower || !address || !purpose || !borrowDate || !returnDate
              }
              onPress={() => {
                handleSubmit();
                console.log("Pressed!");
                // navigation.navigate("Upload Proof");
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
