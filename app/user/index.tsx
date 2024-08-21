import {
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Stack, router } from "expo-router";
import * as Linking from "expo-linking";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Dropdown } from "react-native-element-dropdown";
import { useAuthContext } from "@/src/context/Auth";
import { useUserContext } from "@/src/context/User";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import Images from "@/src/utils/Images";
import { LIMA_DISTRICTS } from "@/src/utils/Constants";
import { getAvatarUrl } from "@/src/utils/Helpers";
import Back from "@/src/components/header/back";
import Input from "@/src/components/input";
import ExitIcon from "@/src/components/icons/exit-icon";
import UploadPhoto from "@/src/components/upload-photo";
import {
  saveUserProfile,
  saveUserAvatar,
  removeUserAvatar,
} from "@/src/models/User";
import { pickImageAsync, pickCameraAsync } from "@/src/models/ImagePicker";

const User = () => {
  const { signOut, token, errors } = useAuthContext();
  const { state, dispatch } = useUserContext();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [120], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = () => bottomSheetModalRef.current?.close();

  const pickImage = async (): Promise<void> => {
    let image = await pickImageAsync([1, 1]);
    if (image) {
      const photo = await saveAvatar(image);
      setAvatar(getAvatarUrl(photo));
      dispatch({
        type: "change-avatar",
        photoload: photo,
      });
      handleClosePress();
    }
  };

  const pickCamera = async (): Promise<void> => {
    let image = await pickCameraAsync([1, 1]);
    if (image) {
      const photo = await saveAvatar(image);
      dispatch({
        type: "change-avatar",
        photoload: photo,
      });
      setAvatar(getAvatarUrl(photo));
      handleClosePress();
    }
  };

  const saveProfile = async (): Promise<void> => {
    const response = await saveUserProfile(
      {
        name,
        lastname,
        email,
        phone,
        district,
      },
      token,
      state.id
    );
    if (response.status) {
      Alert.alert("Perfil de usuario guardado.");
      dispatch({
        type: "change",
        payload: response.data,
      });
    }
  };

  const saveAvatar = async (
    imageUri: string | boolean
  ): Promise<string | undefined> => {
    const avatar = await saveUserAvatar(imageUri, token, state.id);
    Alert.alert("Imagen de perfil guardada.");
    return avatar;
  };

  const removeAvatar = async (): Promise<void> => {
    const response: string = await removeUserAvatar(token, state.id);
    Alert.alert(response);
    dispatch({
      type: "change-avatar",
    });
    setAvatar(undefined);
  };

  const handleCameraPermission = useCallback(async () => {
    if (cameraStatus) {
      if (
        cameraStatus.status === ImagePicker.PermissionStatus.UNDETERMINED ||
        (cameraStatus.status === ImagePicker.PermissionStatus.DENIED &&
          cameraStatus.canAskAgain)
      ) {
        const permission = await requestCameraPermission();
        if (permission.granted) {
          await pickCamera();
        }
      } else if (cameraStatus.status === ImagePicker.PermissionStatus.DENIED) {
        await Linking.openSettings();
      } else {
        await pickCamera();
      }
    }
  }, [cameraStatus, pickCamera, requestCameraPermission]);

  useEffect(() => {
    setName(state.name);
    setLastname(state.lastname);
    setPhone(state.phone);
    setEmail(state.email);
    setDistrict(state.district);
    setAvatar(getAvatarUrl(state.photo));
  }, [state]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={LayoutStyles.whiteContainer}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "",
            headerLeft: () => <Back />,
          }}
        />
        <ScrollView
          style={{ paddingTop: 20 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            style={styles.modal}
            handleStyle={{ backgroundColor: "#E6E6E6" }}
            backdropComponent={renderBackdrop}
          >
            <BottomSheetView
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <View style={styles.modalContent}>
                <Pressable
                  onPress={handleCameraPermission}
                  style={[
                    styles.buttonOutline,
                    { backgroundColor: Colors.white },
                  ]}
                >
                  <Icon name="camera" size={15} color={Colors.maastrichtBlue} />
                  <Text style={styles.buttonOutlineText}>Cámara</Text>
                </Pressable>
                <Pressable
                  onPress={pickImage}
                  style={[
                    styles.buttonOutline,
                    { backgroundColor: Colors.white },
                  ]}
                >
                  <Icon name="image" size={15} color={Colors.maastrichtBlue} />
                  <Text style={styles.buttonOutlineText}>Galería</Text>
                </Pressable>
              </View>
            </BottomSheetView>
          </BottomSheetModal>

          <View style={[LayoutStyles.scrollContainer, { width: "80%" }]}>
            <Image
              source={{ uri: avatar }}
              placeholder={Images.avatarDefault}
              style={{
                borderRadius: 60,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 20,
                height: 120,
                width: 120,
              }}
              transition={300}
            />
            <UploadPhoto
              onRemovePhoto={removeAvatar}
              onModalPress={handlePresentModalPress}
              position="Horizontal"
            />
            <View style={{ width: "100%", marginBottom: 20 }}>
              <Input
                placeholder="Nombre"
                value={name}
                onChangeText={(text) => setName(text)}
                styles={styles.input}
                theme="light"
                error={errors ? errors.name : null}
              />
              <Input
                placeholder="Apellidos"
                value={lastname}
                onChangeText={(text) => setLastname(text)}
                styles={styles.input}
                theme="light"
                error={errors ? errors.lastname : null}
              />
              <Input
                placeholder="Número de celular"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                styles={styles.input}
                theme="light"
                keyboardType="numeric"
                error={errors ? errors.phone : null}
              />
              <Input
                placeholder="Correo electrónico"
                value={email}
                onChangeText={(text) => setEmail(text)}
                styles={styles.input}
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
            </View>

            <View
              style={{
                width: "80%",
                marginBottom: 40,
                marginHorizontal: "auto",
              }}
            >
              <Pressable
                onPress={() => router.push("/user/password")}
                style={styles.button}
              >
                <Text
                  style={{ fontFamily: "PoppinsMedium", color: Colors.white }}
                >
                  Cambiar contraseña
                </Text>
              </Pressable>
              <Pressable onPress={() => signOut()} style={styles.button}>
                <ExitIcon />
                <Text
                  style={{ fontFamily: "PoppinsMedium", color: Colors.white }}
                >
                  Cerrar sesión
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, { backgroundColor: Colors.white }]}
                onPress={() => router.push("/user/delete")}
              >
                <Text
                  style={{
                    color: Colors.metallicGreen,
                    textDecorationLine: "underline",
                    fontFamily: "PoppinsMedium",
                  }}
                >
                  Eliminar cuenta
                </Text>
              </Pressable>
            </View>
            <View style={{ width: "100%", marginBottom: 50 }}>
              <Pressable
                onPress={() => saveProfile()}
                style={[
                  styles.button,
                  { backgroundColor: Colors.metallicGreen },
                ]}
              >
                <Text
                  style={{ fontFamily: "PoppinsMedium", color: Colors.white }}
                >
                  GUARDAR
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default User;

const styles = StyleSheet.create({
  buttonOutline: {
    borderColor: Colors.silverSand,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    flexGrow: 1,
  },
  buttonOutlineText: {
    fontFamily: "PoppinsMedium",
    color: Colors.maastrichtBlue,
  },
  button: {
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    padding: 10,
  },
  buttonText: {
    color: Colors.maastrichtBlue,
    fontSize: 18,
    fontFamily: "PoppinsMedium",
  },
  input: {
    color: Colors.maastrichtBlue,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: Colors.silverSand,
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "PoppinsMedium",
  },
  modal: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  modalContent: {
    flexDirection: "row",
    gap: 30,
    marginBottom: 15,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 30,
  },
  errorMessages: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: "red",
    marginBottom: 15,
  },
});
