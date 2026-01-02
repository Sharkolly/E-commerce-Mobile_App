import { View, Text, Pressable, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useState } from "react";

const Cart = () => {
  const [status, setStatus] = useState("Locked");

  const authenticate = async () => {
    // 1️⃣ Check if device supports biometrics
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      alert("Your device does not support biometric auth");
      return;
    }


    // 2️⃣ Check if user enrolled biometrics
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      alert("No fingerprint or face ID enrolled");
      return;
    }

    // 3️⃣ Authenticate
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to unlock your fucking phonne",
      fallbackLabel: "Use phone PIN",
      cancelLabel: "Cancel",
    });

    console.log(result);


    if (result.success) {
      setStatus("Unlocked 🔓");
    } else {
      setStatus("Failed ❌");
    }
  };
  return (
    <View>
      <Text style={styles.title}>Expo Local Authentication</Text>

      <Text style={styles.status}>{status}</Text>

      <Pressable style={styles.button} onPress={authenticate}>
        <Text style={styles.buttonText}>Authenticate</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 22,
    marginBottom: 20,
  },
  status: {
    color: "#38bdf8",
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#0ea5e9",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
export default Cart;
