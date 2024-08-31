import {
  Pressable,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Link, Href } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import { useAuthContext } from "@/src/context/Auth";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import Input from "@/src/components/input";
import { LIMA_DISTRICTS } from "@/src/utils/Constants";

const CheckboxText = () => {
  return (
    <Text
      style={{
        color: "black",
        paddingLeft: 15,
        fontFamily: "PoppinsMedium",
      }}
    >
      Estoy de acuerdo con los
      <Link
        href={"/(auth)/terms" as Href<"/(auth)/terms">}
        style={{ color: Colors.metallicGreen, marginLeft: 4 }}
      >
        Términos y condiciones
      </Link>
    </Text>
  );
};

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const { signUp, loading, errors } = useAuthContext();

  return (
    <ChildPage style={{ width: "70%" }}>
      <View style={{ marginBottom: 30 }}>
        <Text style={LayoutStyles.pageTitle}>REGISTRO</Text>
        <Input
          placeholder="Nombre"
          value={name}
          onChangeText={(text: string) => setName(text)}
          styles={PageStyles.input}
          theme="light"
          error={errors ? errors.name : null}
        />
        <Input
          placeholder="Apellido"
          value={lastname}
          onChangeText={(text: string) => setLastname(text)}
          styles={PageStyles.input}
          theme="light"
          error={errors ? errors.lastname : null}
        />
        <Input
          placeholder="Número de celular"
          value={phone}
          onChangeText={(text: string) => setPhone(text)}
          styles={PageStyles.input}
          theme="light"
          keyboardType="number-pad"
          error={errors ? errors.phone : null}
        />
        <Input
          placeholder="Correo electrónico"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          styles={PageStyles.input}
          theme="light"
          keyboardType="email-address"
          error={errors ? errors.email : null}
        />
        <Dropdown
          style={PageStyles.dropdown}
          data={LIMA_DISTRICTS}
          labelField="value"
          valueField="value"
          placeholder="Distrito"
          placeholderStyle={PageStyles.dropdownPlaceholder}
          onChange={(item) => setDistrict(item.value)}
          value={district}
        />
        {errors?.district ? (
          <Text style={styles.errorMessages}>{errors.district}</Text>
        ) : (
          <View style={{ marginBottom: 15 }} />
        )}
        <Input
          placeholder="Contraseña"
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          styles={PageStyles.input}
          theme="light"
          password={true}
          error={errors ? errors.password : null}
        />
        <Input
          placeholder="Repetir contraseña"
          value={password_confirmation}
          onChangeText={(text: string) => setPasswordConfirmation(text)}
          styles={PageStyles.input}
          theme="light"
          password={true}
        />
        <BouncyCheckbox
          fillColor={Colors.greenLizard}
          innerIconStyle={{ borderColor: Colors.silverSand, borderWidth: 2 }}
          size={22}
          textComponent={<CheckboxText />}
          onPress={() => setCheckbox(!checkbox)}
        />
        {errors?.checkbox ? (
          <Text style={styles.errorMessages}>{errors.checkbox}</Text>
        ) : null}
      </View>
      <View style={{ marginBottom: 30, width: "100%" }}>
        {loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Pressable
            onPress={() =>
              signUp({
                name,
                lastname,
                phone,
                email,
                district,
                password,
                password_confirmation,
                checkbox,
              })
            }
            style={PageStyles.button}
          >
            <Text style={PageStyles.buttonText}>REGISTRAR</Text>
          </Pressable>
        )}
      </View>
    </ChildPage>
  );
};

export default Register;

const styles = StyleSheet.create({
  errorMessages: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: "red",
    marginBottom: 15,
  },
});
