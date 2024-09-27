// src/screens/RegisterScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { registerApi } from "../api/auth";
import { login } from "../redux/authSlice";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State variable for error messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const dispatch = useDispatch();
  const drawable = require("../../assets/app_icon_sec.png");

  const handleRegister = async () => {
    // Input validation
    if (!username || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true); // Start loading indicator
    try {
      // Call the register API with the username and password
      const data = await registerApi(username, password);

      // Assuming the response data contains 'user' and 'token'
      dispatch(login({ user: data.user, authToken: data.token }));

      // Navigate to the Inbox screen or Home screen
      navigation.navigate("Inbox");
    } catch (error) {
      console.error("Registration error:", error);

      // Extract error message from the response or use a default message
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during registration.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={drawable} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          if (error) setError("");
        }}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (error) setError("");
        }}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          if (error) setError("");
        }}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.registerText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.loginPromptText}>
        Already have an account?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Log In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles similar to LoginScreen, adjusted for RegisterScreen
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50", // A different color to distinguish from login
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginPromptText: {
    color: "#888",
    fontSize: 14,
    marginTop: 20,
  },
  loginLink: {
    color: "#3897f0",
    fontWeight: "bold",
  },
});
