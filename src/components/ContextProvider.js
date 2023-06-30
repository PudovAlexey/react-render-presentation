import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { imgConfig } from "./Chat";
import { fetchThousandMessages } from "../utils.js/fetchPeople";

const StoreContext = createContext();
const DispatchContext = createContext();

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    fetchThousandMessages().then((messages) => {
          
    });
  }, []);

  return (
    <DispatchContext.Provider value={useMemo(() => dispatch, [])}>
      <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
    </DispatchContext.Provider>
  );
}

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "sendMessage":
      const newId = +new Date();

      return {
        ...state,
        [newId]: {
          img: imgConfig["Darth Vader"],
          name: "Darth Vader",
          message: payload.inputValue,
          isMessageEdit: false,
        },
      };
    case "onDeleteMessage":
      const cloneMessagesById = { ...state };

      delete cloneMessagesById[payload.messageId];
      return cloneMessagesById;
    case "onStartChangeUserMessage":
      return {
        ...state,
        [payload.messageId]: {
          ...state[payload.messageId],
          isMessageEdit: true,
        },
      };
    case "changeMessage":
      return {
        ...state,
        [payload.messageId]: {
          ...state[payload.messageId],
          message: payload.value,
        },
      };
    case "onMessageSave":
      return {
        ...state,
        [payload.messageId]: {
          ...state[payload.messageId],
          isMessageEdit: false,
        },
      };
    case "fetchMessages":
      return action.payload.messages;
    default:
      return state;
  }
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};

export const useDispatch = () => {
  return useContext(DispatchContext);
};
