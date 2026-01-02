import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Passwords must be at least 6 characters long.");
      return;
    }

    if (isSignUp) {
     const error = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      } 
    }

    if (!isSignUp) {
     const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }

    router.replace("/test");
    }

    setError("");
  };

  const toggleForm = () => setIsSignUp((prev) => !prev);

  const theme = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineLarge">
          {" "}
          {isSignUp ? "Create Account" : "Welcome Back"}{" "}
        </Text>

        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="abc@gmail.com"
          mode="outlined"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          autoCapitalize="none"
          secureTextEntry
          placeholder="Your password..."
          mode="outlined"
          style={styles.input}
          onChangeText={setPassword}
        />

        {error && (
          <Text style={{ color: theme.colors.error, textAlign: "center" }}>
            {error}
          </Text>
        )}

        <Button mode="contained" style={styles.button} onPress={handleAuth}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        <Button
          mode="text"
          onPress={toggleForm}
          style={styles.switchModeButton}
        >
          {" "}
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}{" "}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "#f5f5f5",
    gap: 12,
  },

  content: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
