import { Colors } from "@/constants/theme";
import axios from "axios";
import { useRouter } from "expo-router";
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

const RegisterPage = () => {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const API_URL =
    "https://mekarjs-erp-core-service.yogawanadityapratama.com/api/owner/account/register";

  const handleRegister = async () => {
    if (!nama || !email || !password) {
      Alert.alert("Peringatan", "Mohon lengkapi semua kolom pendaftaran.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(API_URL, {
        nama: nama,
        email: email,
        password: password,
      });

      console.log("Register Success:", response.data);

      Alert.alert("Berhasil", "Akun Owner berhasil dibuat. Silakan Login.", [
        { text: "OK", onPress: () => router.replace("/(auth)/login") },
      ]);
    } catch (error: any) {
      console.error("Register Error:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || "Gagal mendaftar. Coba lagi nanti.";
      Alert.alert("Gagal", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Daftar Baru</Text>
            <Text style={styles.subtitle}>Buat akun Owner CoreQuarry</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nama Lengkap</Text>
              <TextInput
                style={styles.input}
                placeholder="Alif Arya Kusuma"
                placeholderTextColor={colorScheme === "dark" ? "#888" : "#999"}
                value={nama}
                onChangeText={setNama}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="email@domain.com"
                placeholderTextColor={colorScheme === "dark" ? "#888" : "#999"}
                keyboardType="email-address"
                autoCapitalize="none"
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
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#171717" />
              ) : (
                <Text style={styles.buttonText}>Daftar Sekarang</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Text style={styles.linkText}>
                Sudah punya akun?{" "}
                <Text style={styles.linkTextBold}>Login di sini</Text>
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

export default RegisterPage;
