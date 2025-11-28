import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Pastikan URL ini benar & bisa diakses device (bukan localhost laptop)
  const API_URL =
    "https://corequarry-core-service.vercel.app/api/owner/account/login";

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

      // Simpan token ke SecureStore
      await SecureStore.setItemAsync("token", token);

      console.log("Login Success:", token);

      // Redirect ke halaman home/dashboard
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

  return (
    // ✅ SafeAreaView dari context akan otomatis handle notch/status bar
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEEEEE" }}>
<StatusBar style="light" backgroundColor="black" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        // Untuk Android, behavior 'height' biasanya lebih stabil daripada undefined
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          // ✅ contentContainerStyle flexGrow: 1 agar konten bisa di-center vertikal
          // jika layarnya panjang, tapi tetap bisa discroll kalau keyboard muncul
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            justifyContent: "center",
          }}
        >
          <View style={{ marginBottom: 40 }}>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>
              CoreQuarry
            </Text>
            <Text style={{ fontSize: 16, color: "#666", marginTop: 5 }}>
              Login Owner
            </Text>
          </View>

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#17171715", // Warna border lebih halus
              padding: 15, // Padding lebih besar biar enak ditekan
              marginTop: 20,
              borderRadius: 12,
              backgroundColor: "#EEEEEE",
            }}
            placeholder="Email Address"
            autoCapitalize="none"
            keyboardType="email-address" // Keyboard khusus email
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#17171715",
              padding: 15,
              marginTop: 15,
              borderRadius: 12,
              backgroundColor: "#EEEEEE",
            }}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#FFBB00",
              padding: 16,
              marginTop: 30,
              borderRadius: 999,
              alignItems: "center",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3, // Shadow untuk Android
            }}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              {loading ? "Sedang Masuk..." : "Login Sekarang"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "center" }}
            onPress={() => router.push("/(auth)/register")}
          >
            <Text style={{ color: "#FFBB00", fontSize: 14 }}>
              Belum punya akun?{" "}
              <Text style={{ fontWeight: "bold" }}>Daftar di sini</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginPage;
