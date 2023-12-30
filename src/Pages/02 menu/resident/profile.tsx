import Reac, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../firebaseConfig";

export function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = FIREBASE_AUTH;
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(FIREBASE_DB, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 20,
          // marginTop: 50,
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
          source={{
            uri: "https://via.placeholder.com/100",
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ textTransform: "capitalize" }}>
            {user?.firstname} {user?.lastname}
          </Text>
          <Text>{user?.phonenumber}</Text>
          <Text>{user?.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
