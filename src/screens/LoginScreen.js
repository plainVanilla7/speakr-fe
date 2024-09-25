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

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ username }));
    navigation.navigate("Inbox");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
        }}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number, username or email"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
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
