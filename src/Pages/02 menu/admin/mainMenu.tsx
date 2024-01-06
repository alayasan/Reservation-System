import { View, Text } from 'react-native'
import React from 'react'
import { NavProps } from '../../../interface/navProps';
import { Button } from 'react-native-paper';

const AdminMenuPage = ({ navigation }: NavProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        mode="elevated"
        style={{
          width: "80%",
          // height: "30%",
          backgroundColor: "#fff",
          marginTop: 20,
          borderColor: "#000",
          borderWidth: 1,
        }}
        labelStyle={{ color: "black" }}
        onPress={() => navigation.navigate("Reservation Forms")}
      >
        Check Reservations Submitted!
      </Button>
    </View>
  );
};

export default AdminMenuPage