import { createContext, useContext, useReducer, type Dispatch } from "react";
import { UserData, ProviderProps } from "@/src/utils/Types";

interface Action {
  type: string;
  payload?: UserData;
  photoload?: string;
}

const initialState: UserData = {
  id: 0,
  name: "",
  lastname: "",
  email: "",
  phone: "",
  district: "",
  photo: null,
  push: false,
  mailing: false,
};

const UserContext = createContext<{
  state: UserData;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const UserReducer = (state: UserData, action: Action): UserData => {
  switch (action.type) {
    case "change": {
      return {
        id: action.payload!.id,
        name: action.payload!.name,
        lastname: action.payload!.lastname,
        email: action.payload!.email,
        phone: action.payload!.phone,
        district: action.payload!.district,
        photo: action.payload!.photo,
        push: action.payload!.push,
        mailing: action.payload!.mailing,
      };
    }
    case "delete": {
      return initialState;
    }
    case "change-avatar": {
      return {
        ...state,
        photo: action.photoload,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
