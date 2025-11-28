import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// ✅ Menggunakan SafeAreaView dari context (Best Practice)
import axios from "axios";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterPage = () => {
  const router = useRouter();

  // State untuk form input
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State untuk loading
  const [loading, setLoading] = useState(false);

  const API_URL =
    "https://corequarry-core-service.vercel.app/api/owner/account/register";

  const handleRegister = async () => {
    // 1. Validasi Sederhana
    if (!nama || !email || !password) {
      Alert.alert("Peringatan", "Mohon lengkapi semua kolom pendaftaran.");
      return;
    }

    try {
      setLoading(true);

      // 2. Hit API
      const response = await axios.post(API_URL, {
        nama: nama,
        email: email,
        password: password,
      });

      console.log("Register Success:", response.data);

      // 3. Sukses: Beritahu user & arahkan ke Login
      Alert.alert("Berhasil", "Akun Owner berhasil dibuat. Silakan Login.", [
        { text: "OK", onPress: () => router.replace("/(auth)/login") }, // Asumsi path login
      ]);
    } catch (error: any) {
      // 4. Error Handling
      console.error("Register Error:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || "Gagal mendaftar. Coba lagi nanti.";
      Alert.alert("Gagal", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEEEEE" }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>
              Daftar Baru
            </Text>
            <Text style={{ fontSize: 16, color: "#666", marginTop: 5 }}>
              Buat akun Owner CoreQuarry
            </Text>
          </View>

          {/* Form Input Section */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 8, fontWeight: "600", color: "#444" }}>
              Nama Lengkap
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Alif Arya Kusuma"
              value={nama}
              onChangeText={setNama}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 8, fontWeight: "600", color: "#444" }}>
              Email
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: email@domain.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={{ marginBottom: 30 }}>
            <Text style={{ marginBottom: 8, fontWeight: "600", color: "#444" }}>
              Password
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Daftar Sekarang
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "center" }}
            onPress={() => router.back()} // Kembali ke halaman sebelumnya (biasanya Login)
          >
            <Text style={{ color: "#FFBB00", fontSize: 14 }}>
              Sudah punya akun?{" "}
              <Text style={{ fontWeight: "bold" }}>Login di sini</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styling terpisah agar lebih rapi
const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: "#FFBB00", // Warna biru standar (bisa diganti sesuai brand)
    padding: 16,
    borderRadius: 12,
    alignItems: "center" as const, // Type casting untuk TypeScript
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
};

export default RegisterPage;
