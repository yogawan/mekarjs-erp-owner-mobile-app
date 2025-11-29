import { Colors } from "@/constants/theme";
import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const API_URL =
    "https://mekarjs-erp-core-service.yogawanadityapratama.com//api/owner/account/login";

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan Password wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(API_URL, {
        email,
        password,
      });

      const token = response.data.token;

      await SecureStore.setItemAsync("token", token);

      console.log("Login Success:", token);

      router.replace("/(tabs)");
    } catch (error: any) {
      console.log("Login Error:", error.response?.data || error.message);
      Alert.alert(
        "Login Gagal",
        error.response?.data?.message || "Terjadi kesalahan pada server.",
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>CoreQuarry</Text>
            <Text style={styles.subtitle}>Login Owner</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="email@domain.com"
                placeholderTextColor={colorScheme === "dark" ? "#888" : "#999"}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan password"
                placeholderTextColor={colorScheme === "dark" ? "#888" : "#999"}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#171717" />
              ) : (
                <Text style={styles.buttonText}>Login Sekarang</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => router.push("/(auth)/register")}
              activeOpacity={0.7}
            >
              <Text style={styles.linkText}>
                Belum punya akun?{" "}
                <Text style={styles.linkTextBold}>Daftar di sini</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = (theme: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 24,
      justifyContent: "center",
    },
    header: {
      marginBottom: 48,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      color: theme.text,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 16,
      color: theme.text,
      marginTop: 8,
      opacity: 0.7,
    },
    form: {
      gap: 20,
    },
    inputGroup: {
      gap: 8,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 4,
    },
    input: {
      borderWidth: 1.5,
      borderColor: theme.border,
      padding: 16,
      borderRadius: 12,
      backgroundColor: theme.background,
      fontSize: 16,
      color: theme.text,
    },
    button: {
      backgroundColor: theme.primary,
      padding: 18,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 12,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: "#171717",
      fontWeight: "700",
      fontSize: 16,
    },
    linkContainer: {
      marginTop: 8,
      alignItems: "center",
      paddingVertical: 8,
    },
    linkText: {
      color: theme.text,
      fontSize: 14,
      opacity: 0.8,
    },
    linkTextBold: {
      fontWeight: "700",
      color: theme.primary,
    },
  });

export default LoginPage;
