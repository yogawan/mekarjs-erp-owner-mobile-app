import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export const checkToken = async () => {
  const token = await SecureStore.getItemAsync("token");

  if (!token) {
    router.replace("(auth)/login");
  }

  return token;
};
