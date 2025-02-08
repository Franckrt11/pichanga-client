import { Platform } from "react-native";
import { createContext, useEffect, useContext, useState } from "react";
import { router, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import {
  Settings,
  LoginManager,
  AccessToken,
  AuthenticationToken,
  Profile,
} from "react-native-fbsdk-next";
import { useUserContext } from "./User";
import {
  fetchLogin,
  fetchRegister,
  fetchUser,
  fetchNewPassword,
  fetchLogout,
  fetchGoogleLogin,
  fetchFacebookLogin,
} from "@/src/models/Auth";
import { fetchConfigAll } from "@/src/models/Config";
import { RegisterUserData, ProviderProps } from "@/src/utils/Types";

interface IAuthContext {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (data: RegisterUserData) => Promise<void>;
  googleSignIn: () => Promise<void>;
  facebookSignIn: () => Promise<void>;
  newPassword: (
    email: string,
    oldPassword: string,
    newPassword: string
  ) => Promise<void>;
  token: string | null;
  userId: string | null;
  loading: boolean;
  errors: any; // Revisar type de Errores del API
  config: any; // Setear Type de Config
}

const AuthContext = createContext({} as IAuthContext);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const useProtectedRoute = (token: string | null) => {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!token && !inAuthGroup) {
      router.replace("/login");
    } else if (token && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [token, segments]);
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [errors, setErrors] = useState(null);
  const [config, setConfig] = useState(null);
  const { dispatch } = useUserContext();

  const loadConfig = async (token: string) => {
    const response = await fetchConfigAll(token);
    if (response.status) {
      setConfig(response.data);
    }
  };

  const unauthenticated = () => {
    setToken(null);
    setUserId(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    dispatch({ type: "delete" });
  };

  const signIn = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetchLogin(username, password);

      if (response.status) {
        setToken(response.token);
        setUserId(response.user.id.toString());
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("userId", response.user.id.toString());
        dispatch({
          type: "change",
          payload: response.user,
        });
        await loadConfig(response.token);
      } else {
        setErrors(response.errors);
        console.log("fetchLogin Error", response.errors);
      }
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ signIn() ~ error:", error);
    }
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    try {
      let storageGoogleId = await AsyncStorage.getItem("googleId");
      let storageFacebookId = await AsyncStorage.getItem("facebookId");

      const response = await fetchLogout(token);
      if (response.status) {
        setToken(null);
        setUserId(null);
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("userId");
        dispatch({ type: "delete" });
      }

      if (storageGoogleId) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        AsyncStorage.removeItem("googleId");
      }

      if (storageFacebookId) {
        LoginManager.logOut();
        AsyncStorage.removeItem("facebookId");
      }

      if (response.message === "Unauthenticated.") {
        unauthenticated();
      }
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ signOut() ~ error:", error);
    }
    setLoading(false);
  };

  const signUp = async (data: RegisterUserData) => {
    // TODO: Implementar validación
    setLoading(true);
    try {
      const response = await fetchRegister(data);

      if (response.status) {
        setToken(response.token);
        setUserId(response.user.id.toString());
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("userId", response.user.id.toString());
        dispatch({
          type: "change",
          payload: response.user,
        });
        setErrors(null);
      } else {
        setErrors(response.errors);
        console.log("fetchRegister Error", response.errors);
      }
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ signOut() ~ error:", error);
    }
    setLoading(false);
  };

  const newPassword = async (
    email: string,
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      let userToken = await AsyncStorage.getItem("token");
      let userId = await AsyncStorage.getItem("userId");

      const response = await fetchNewPassword(email, oldPassword, newPassword);
      // Pendiente por completar
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ newPassword() ~ error:", error);
    }
  };

  const isLoggedIn = async () => {
    try {
      let storageToken = await AsyncStorage.getItem("token");
      let storageId = await AsyncStorage.getItem("userId");

      if (storageToken !== null && typeof storageToken !== "undefined") {
        setToken(storageToken);
        setUserId(storageId);
        await loadConfig(storageToken);
      }

      if (storageId !== null && typeof storageId !== "undefined") {
        const response = await fetchUser(storageId, storageToken);
        if (response.status) {
          dispatch({
            type: "change",
            payload: response.data,
          });
        } else if (response.message === "Unauthenticated.") {
          unauthenticated();
        } else {
          console.log(
            "🚩 ~ context/Auth.js ~ isLoggedIn() ~ fetchUser:",
            response
          );
        }
      }
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ isLoggedIn() ~ error:", error);
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("🚀 ~ googleSignIn ~ userInfo:", userInfo);

      if (userInfo) {
        const response = await fetchGoogleLogin(userInfo.user);
        if (response.status) {
          setToken(response.token);
          setUserId(response.user.id.toString());
          await AsyncStorage.setItem("token", response.token);
          await AsyncStorage.setItem("userId", response.user.id.toString());
          await AsyncStorage.setItem("googleId", userInfo.idToken as string);
          dispatch({
            type: "change",
            payload: response.user,
          });
          await loadConfig(response.token);
        }
      } else {
        console.log("🚨 ~ googleSignIn ~ GoogleSignin cancelled");
      }
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ googleSignIn() ~ error:", error);
    }
  };

  const facebookSignIn = async () => {
    try {
      const fblogin = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      console.log("🚀 ~ facebookSignIn ~ fblogin:", fblogin);
      if (fblogin.isCancelled) {
        console.log("🚨 ~ facebookSignIn ~ fblogin:Login cancelled");
      } else {
        if (Platform.OS === "ios") {
          const fbToken = await AuthenticationToken.getAuthenticationTokenIOS();
          if (fbToken) {
            await AsyncStorage.setItem("facebookId", fbToken.authenticationToken);
            console.log("IOS fbToken", fbToken.authenticationToken);
          }
        } else {
          const fbToken = await AccessToken.getCurrentAccessToken();
          if (fbToken) {
            await AsyncStorage.setItem("facebookId", fbToken.accessToken.toString());
            console.log("ANDROID fbToken", fbToken.accessToken.toString());
          }
        }

        const currentProfile = await Profile.getCurrentProfile();
        console.log("🚀 ~ facebookSignIn ~ currentProfile:", currentProfile);
        if (currentProfile) {
          const response = await fetchFacebookLogin(currentProfile);
          if (response.status) {
            setToken(response.token);
            setUserId(response.user.id.toString());
            await AsyncStorage.setItem("token", response.token);
            await AsyncStorage.setItem("userId", response.user.id.toString());
            dispatch({
              type: "change",
              payload: response.user,
            });
            await loadConfig(response.token);
          }
        }
      }
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ facebookSignIn() ~ error:", error);
    }
  };

  const configureGoogleSignin = async () => GoogleSignin.configure();

  const requestTracking = async () => {
    const { status } = await requestTrackingPermissionsAsync();

    Settings.initializeSDK();

    if (status !== "granted") {
      console.log("Permission to tracking was denied");
    } else {
      await Settings.setAdvertiserTrackingEnabled(true);
    }
  };

  useEffect(() => {
    requestTracking();
    configureGoogleSignin();
    isLoggedIn();
  }, []);

  useProtectedRoute(token);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        googleSignIn,
        facebookSignIn,
        newPassword,
        token,
        userId,
        loading,
        errors,
        config,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
