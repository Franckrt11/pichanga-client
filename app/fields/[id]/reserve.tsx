import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { Dropdown } from "react-native-element-dropdown";
import { fetchField, fetchFieldDays } from "@/src/models/Field";
import { saveReserve } from "@/src/models/Reserve";
import { useAuthContext } from "@/src/context/Auth";
import { useUserContext } from "@/src/context/User";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { FieldData, HourRange } from "@/src/utils/Types";
import Switch from "@/src/components/switch";
import ChildPage from "@/src/components/layouts/child-page";
import ButtonCheckbox from "@/src/components/button-checkbox";
import CalendarIcon from "@/src/components/icons/calendar-icon";
import ArrowDownIcon from "@/src/components/icons/arrowdown-icon";
import { HOUR_LIST } from "@/src/utils/Constants";

const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

interface DayData {
  day: number;
  hours: HourRange[];
  day_name: string;
}

interface GameData {
  mode: string;
  text: string;
}

interface HoursList {
  value: number;
  text: string;
}

interface CurrentMode {
  [key: string]: boolean;
}

const INIT_MODES = {
  "5v5": false,
  "6v6": false,
  "7v7": false,
  "8v8": false,
  "9v9": false,
  "10v10": false,
  "11v11": false,
};

const TIME_LIST = [
  {
    label: "1/2 hora",
    value: 0.5,
  },
  {
    label: "1 hora",
    value: 1,
  },
  {
    label: "1 1/2 hora",
    value: 1.5,
  },
  {
    label: "2 horas",
    value: 2,
  },
  {
    label: "2 1/2 horas",
    value: 2.5,
  },
  {
    label: "3 horas",
    value: 3,
  },
];

const FieldReserve = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const { state } = useUserContext();
  const [field, setField] = useState<FieldData | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [date, setDate] = useState<string>("");
  const [hour, setHour] = useState<number>(0);
  const [time, setTime] = useState<number>(1);
  const [datePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [hasIscription, setHasInscription] = useState<boolean>(false);
  const [hoursList, setHoursList] = useState<HoursList[]>([]);
  const [price, setPrice] = useState(0);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [games, setGames] = useState<GameData[]>([]);
  const [currentModes, setCurrentModes] = useState<CurrentMode>(INIT_MODES);

  const [dayHours, setDayHours] = useState<DayData[]>([]);

  const toggleShowDatePicker = () =>
    setDatePickerVisibility(!datePickerVisible);

  const handleConfirmDate = (date: Date) => {
    const day_number = getDay(date);
    const filtered = dayHours.filter((day) => {
      return day.hours.length > 0;
    });
    let allowed = filtered.find((d) => d.day === day_number);
    if (allowed) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
    setDate(format(new Date(date), "dd MMM yyyy", { locale: es }));
    getHoursOnDay(date);
    setCurrentDate(date);
    toggleShowDatePicker();
  };

  const getField = async () => {
    const response = await fetchField(params.id as unknown as number, token);
    if (response.status) {
      setField(response.data);
      getDays();
      getModes(response.data.games);
    }
  };

  const getDays = async () => {
    const response = await fetchFieldDays(
      params.id as unknown as number,
      token
    );

    if (response.status) {
      const days_maped = response.data.map((dayObj: DayData) => {
        return {
          day: dayObj.day,
          hours: dayObj.hours,
          day_name: DAY_NAMES[dayObj.day],
        };
      });
      setDayHours(days_maped);
      allowDays(days_maped);
    }
  };

  const getModes = (json: string) => {
    const decode: string[] = JSON.parse(json);
    const game_maped = decode.map((game) => {
      return {
        mode: game,
        text: game.replace("v", " vs "),
      };
    });
    setGames(game_maped);
  };

  const numberRange = (start: number, end: number): Array<number> => {
    return Array.from({ length: end - start }, (x, i) => i + start);
  };

  const getHoursOnDay = (date: Date) => {
    const day_number = getDay(date);
    const filtered = dayHours.filter((day) => {
      return day.day === day_number;
    });
    let hour_array: number[] = [];

    filtered[0].hours.map((hour) => {
      let rangue = numberRange(hour.start, hour.end);
      hour_array = [...new Set([...hour_array, ...rangue])];
    });

    const hours_allowed = HOUR_LIST.filter((i) => hour_array.includes(i.value));
    setHoursList(hours_allowed);
  };

  const getPrice = (time: number) => {
    if (currentDate) {
      const day_filtered = dayHours.filter((dayObj) => {
        return dayObj.day === getDay(currentDate);
      });

      const hours_filtered = day_filtered[0].hours.filter((hourObj) => {
        return hour >= hourObj.start && hour <= hourObj.end;
      });

      const priceObj = hours_filtered[0].price;

      const time_whole = Math.floor(time);
      const time_half = time - time_whole;

      const price_whole = time_whole * priceObj.whole;
      const price_half = time_half > 0 ? priceObj.half : 0;

      setPrice(price_whole + price_half);
    }
  };

  const allowDays = (days: DayData[]) => {
    const filtered = days.filter((day) => {
      return day.hours.length > 0;
    });
    const strings = filtered.map((day) => {
      return day.day_name;
    });
    return strings.join(", ");
  };

  const changeModeState = (state: boolean, mode: string) => {
    setCurrentModes({ ...INIT_MODES, [mode]: state });
  };

  const toggleInscription = () => setHasInscription(!hasIscription);

  const makeReserve = async () => {
    const filteredModes = Object.keys(currentModes)
      .map((key) => {
        if (currentModes[key as keyof typeof currentModes]) return key;
      })
      .filter((element) => element !== undefined);
    if (filteredModes[0]) {
      const data = {
        date: format(currentDate as Date, "yyyy/MM/dd"),
        time,
        game: filteredModes[0],
        price,
        status: "pending", // dummy data
        inscription: hasIscription,
        field_hour_id: field?.id ?? 0,
        field_id: params.id as unknown as number,
        user_id: state.id,
      };
      const response = await saveReserve(data, token);
      if (response.status) router.replace("/home");
    }
  };

  useEffect(() => {
    getField();
  }, []);

  return (
    <ChildPage style={{ paddingBottom: 70, width: "80%" }}>
      <Text style={[LayoutStyles.pageTitle, { marginBottom: 0 }]}>
        Reservar cancha
      </Text>
      <Text style={styles.fieldTitle}>{field?.name}</Text>

      <Text
        style={{
          textAlign: "left",
          width: "100%",
          marginBottom: 15,
          fontFamily: "PoppinsSemiBold",
        }}
      >
        Días disponibles: {allowDays(dayHours)}
      </Text>

      <View style={{ marginBottom: 20 }}>
        <View style={styles.inputRow}>
          <View style={styles.inputLabel}>
            <Text style={styles.inputLabelText}>Fecha de reserva</Text>
          </View>
          <View style={styles.inputField}>
            <TextInput
              value={date}
              onChangeText={setDate}
              // autoCorrect={false}
              style={styles.inputFieldInput}
            />
            <Pressable
              style={styles.icon}
              onPress={() => toggleShowDatePicker()}
            >
              <CalendarIcon color={Colors.maastrichtBlue} size={15} />
            </Pressable>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputLabel}>
            <Text style={styles.inputLabelText}>Desde las</Text>
          </View>
          <Dropdown
            style={[PageStyles.dropdown, styles.dropdown]}
            data={hoursList}
            labelField="text"
            valueField="value"
            placeholder="Horario"
            placeholderStyle={[
              PageStyles.dropdownPlaceholder,
              { paddingHorizontal: 10 },
            ]}
            onChange={(item) => {
              setHour(item.value);
              setTime(1);
              getPrice(1);
            }}
            value={hour}
            selectedTextStyle={styles.dropdownSelectectText}
            renderRightIcon={() => (
              <ArrowDownIcon size={10} style={{ marginRight: 10 }} />
            )}
          />
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputLabel}>
            <Text style={styles.inputLabelText}>Tiempo</Text>
          </View>
          <Dropdown
            style={[PageStyles.dropdown, styles.dropdown]}
            data={TIME_LIST}
            labelField="label"
            valueField="value"
            placeholder="Tiempo"
            placeholderStyle={[
              PageStyles.dropdownPlaceholder,
              { paddingHorizontal: 10 },
            ]}
            onChange={(item) => {
              setTime(item.value);
              getPrice(item.value);
            }}
            value={time}
            selectedTextStyle={styles.dropdownSelectectText}
            renderRightIcon={() => (
              <ArrowDownIcon size={10} style={{ marginRight: 10 }} />
            )}
          />
        </View>
      </View>

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Text style={[styles.inputLabelText, { marginBottom: 10 }]}>
          Modo de juego
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            marginBottom: 10,
            flexWrap: "nowrap",
          }}
        >
          {games.map((game, index) => (
            <ButtonCheckbox
              key={`modes-${index}`}
              radius={25}
              color={Colors.metallicGreen}
              checked={currentModes[game.mode]}
              mode={game.mode}
              text={game.text}
              onChangeMode={changeModeState}
            />
          ))}
        </View>
      </View>

      <View
        style={[
          styles.inputRow,
          { justifyContent: "space-between", marginBottom: 20 },
        ]}
      >
        <View style={[styles.inputLabel, { flex: 0 }]}>
          <Text style={styles.inputLabelText}>Partido con inscripción</Text>
        </View>
        <View style={[styles.inputField, { flex: 0 }]}>
          <Switch onValueChange={toggleInscription} value={hasIscription} />
        </View>
      </View>
      <View style={[styles.inputRow, { justifyContent: "space-between" }]}>
        <View style={[styles.inputLabel, { flex: 0 }]}>
          <Text style={styles.inputLabelText}>Costo de reserva</Text>
        </View>
        <View style={[styles.inputField, { flex: 0 }]}>
          <Text style={styles.inputLabelText}>S/ {price}</Text>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={toggleShowDatePicker}
      />

      <View style={{ width: "80%", marginBottom: 30, marginTop: 50 }}>
        <Pressable
          onPress={() => makeReserve()}
          disabled={disableButton}
          style={[
            PageStyles.button,
            disableButton ? { backgroundColor: Colors.silverSand } : {},
          ]}
        >
          <Text style={{ fontFamily: "PoppinsMedium", color: Colors.white }}>
            SOLICITAR RESERVAR
          </Text>
        </Pressable>
      </View>
    </ChildPage>
  );
};

export default FieldReserve;

const styles = StyleSheet.create({
  fieldTitle: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.metallicGreen,
    fontSize: 25,
    marginBottom: 10,
  },
  pseudoButton: {
    flex: 1,
    borderWidth: 2,
    padding: 8,
    borderRadius: 25,
    borderColor: Colors.white,
  },
  inputRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  inputLabel: {
    flex: 1,
  },
  inputLabelText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
  },
  inputField: {
    flex: 1,
    position: "relative",
  },
  inputFieldInput: {
    color: Colors.maastrichtBlue,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    borderRadius: 25,
    fontFamily: "PoppinsMedium",
    marginBottom: 5,
  },
  icon: {
    position: "absolute",
    right: 12,
    top: 10,
  },
  pickerContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    borderRadius: 25,
    height: 35,
    overflow: "hidden",
  },
  dropdown: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: 6,
  },
  dropdownSelectectText: {
    paddingHorizontal: 15,
    fontFamily: "PoppinsMedium",
    fontSize: 14,
  },
});
