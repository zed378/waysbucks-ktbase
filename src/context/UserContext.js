import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  isAdmin: false,
  isPop: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "logShow":
      return {
        logModal: true,
      };

    case "logClose":
      return {
        logModal: false,
      };

    case "regShow":
      return {
        regModal: true,
      };

    case "regClose":
      return {
        regModal: false,
      };

    case "popShow":
      return {
        isLogin: true,
        isAdmin: false,
        isPop: true,
      };

    case "popClose":
      return {
        isLogin: true,
        isAdmin: false,
        isPop: false,
      };

    case "ADMIN":
    case "LOGIN_ADMIN":
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        isAdmin: true,
        user: payload,
      };

    case "USER":
    case "LOGIN_USER":
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        isAdmin: false,
        user: payload,
      };

    case "ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLogin: false,
        isAdmin: false,
        user: {},
      };

    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
