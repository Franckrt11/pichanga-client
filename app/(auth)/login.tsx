import {
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Stack, Link } from "expo-router";
import { useAuthContext } from "@/src/context/Auth";
import Input from "@/src/components/input";
import GoogleLogo from "@/src/components/icons/google-logo";
import FacebookLogo from "@/src/components/icons/facebook-logo";
import Images from "@/src/utils/Images";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading, errors } = useAuthContext();

  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView
        style={{ paddingTop: 80 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={[LayoutStyles.scrollContainer, { width: "80%", alignItems: "stretch" }]}>
          <View style={{ flex: 1, alignItems: "center", marginBottom: 50 }}>
            <Image style={styles.logo} source={Images.logo} />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="Correo o número de celular"
              value={username}
              onChangeText={(text: string) => setUsername(text)}
              styles={PageStyles.input}
              theme="light"
              error={errors ? errors.username : null}
            />
            <Input
              placeholder="Contraseña"
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              styles={PageStyles.input}
              theme="light"
              password={true}
              error={errors ? errors.password : null}
            />
          </View>
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator style={{ marginBottom: 10 }} size={"large"} />
            ) : (
              <Pressable
                onPress={() => signIn(username, password)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>INGRESAR</Text>
              </Pressable>
            )}

            <Pressable
              style={[styles.button, { backgroundColor: Colors.maastrichtBlue, width: "80%" }]}
              onPress={() => console.log('Login invitado')}
            >
              <Text style={styles.buttonText}>Ingresar como INVITADO</Text>
            </Pressable>

            <Text style={styles.text}>
              ¿No tienes una cuenta?
              <Link
                href={"(auth)/register"}
                style={{ color: Colors.metallicGreen, marginLeft: 4 }}
              >
                Registrarse
              </Link>
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Text style={styles.text}>También puedes:</Text>
            <Pressable style={[styles.buttonOutline, {flexDirection: "row", justifyContent: "center"}]}>
              <GoogleLogo size={20} />
              <Text style={{ color: Colors.maastrichtBlue, fontFamily: "PoppinsMedium", marginLeft: 10 }}>Ingresar con Google</Text>
            </Pressable>
            <Pressable style={[styles.buttonOutline, {flexDirection: "row", justifyContent: "center"}]}>
              <FacebookLogo size={20} />
              <Text style={{ color: Colors.maastrichtBlue, fontFamily: "PoppinsMedium", marginLeft: 10 }}>Ingresar con Facebook</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 140
  },
  text: {
    color: Colors.maastrichtBlue,
    fontFamily: "PoppinsMedium",
    marginBottom: 10
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30
  },
  button: {
    backgroundColor: Colors.metallicGreen,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  buttonOutline: {
    backgroundColor: Colors.white,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
  },
});
