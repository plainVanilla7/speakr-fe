// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { loginApi } from "../api/auth";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State variable for error messages
  const dispatch = useDispatch();
  const drawable = require("../../assets/app_icon_sec.png");

  const handleLogin = async () => {
    // Input validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      // Call the login API with the username and password
      const data = await loginApi(username, password);

      // Assuming the response data contains 'user' and 'authToken'
      dispatch(login({ user: data.user, authToken: data.authToken }));

      // Navigate to the Inbox screen
      navigation.navigate("Inbox");
    } catch (error) {
      console.error("Login error:", error);

      // Extract error message from the response or use a default message
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";
      setError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={drawable} style={styles.logo} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          if (error) setError(""); // Clear error when user starts typing
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
          if (error) setError(""); // Clear error when user starts typing
        }}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerText}>Sign up with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Your existing styles
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
    marginBottom: 30,
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
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#3897f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPasswordText: {
    color: "#3897f0",
    marginTop: 10,
    fontSize: 12,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    color: "#888",
  },
  registerButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  registerText: {
    color: "#3897f0",
    fontWeight: "bold",
  },
  signUpText: {
    color: "#888",
    fontSize: 14,
  },
  signUpLink: {
    color: "#3897f0",
    fontWeight: "bold",
  },
});
