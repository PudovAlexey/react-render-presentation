import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetchPeople } from "./utils.js/fetchPeople";

import Leia from "././public/avatar/leia-organa.jpg";
import DartVaider from "././public/avatar/Dart Waider.jpg";
import Luke from "././public/avatar/Luke_Skywalker.jpg";
import Owen from "././public/avatar/Owen-lars.jpg";
import { generateRandomMessageByUserName } from "./utils.js/generateRandomMessage";
import { makeRandomUnit } from "./utils.js/setUserHairColor";
import { Context, useUserContext } from "./ContextProvider";

export const imgConfig = {
  "Luke Skywalker": Luke,
  "Darth Vader": DartVaider,
  "Leia Organa": Leia,
  "Owen Lars": Owen,
};

export const ChatContext = createContext({
  messageIds: [],
  messagesDict: {},
  modifiers: {},
  inputValue: "",
  search: "",
});
export function ChatProvider({ children }) {
  const [actions, setActions] = useState({});

  return (
    <ChatContext.Provider
      value={{
        actions,
        setActions,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
}

export function useActions() {
  const { actions, setActions } = useChatContext();
  const [inputValue, setInputValue] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    setActions((prev) => ({ 
      ...prev,
      setMessage: () => {
        return {
          name: "Darth Vader",
          message: inputValue,
          img: imgConfig["Darth Vader"],
          isMessageEdit: false,
        };
      },
    }));
  }, []);

  function sendMessage() {
    actions.setNewId();
    setInputValue();
  }

  return {
    inputValue,
    search,
    setSearch,
    setInputValue,
    sendMessage,
  };
}

export function useMessageList() {
  const { setActions } = useChatContext();
  const [messageIds, setmessageIds] = useState([]);
  const { messageIds: initialMessageIds, generateMessages } = useUserContext();
  const [sortMessages, setSortMessages] = useState("asc");

  useEffect(() => {
    setmessageIds(initialMessageIds);
  }, [initialMessageIds]);

  const onSort = () => {
    sortMessages === "asc" ? setSortMessages("desc") : setSortMessages("asc");
  };

  useEffect(() => {
    setActions((prev) => ({
      ...prev,
      onDeleteMessage: (id) =>
        setmessageIds((prev) => prev.filter((messageId) => messageId !== id)),
      setNewId: () => {
        let messageId = 0;
        setmessageIds((prev) => {
          messageId = Math.max(...prev) + 1;
          return [...prev, messageId];
        });
        return messageId;
      },
    }));
  }, []);

  return {
    messageIds,
    sortMessages,
    onSort,
    generateMessages,
  };
}

export function useMessageById(id) {
  const { actions, setActions } = useChatContext();
  const { messagesDict } = useUserContext();
  const [message, setMessage] = useState({});

  if (message && !message?.name && messagesDict[id]) {
    setMessage(messagesDict[id]);
  }

  if (!messagesDict[id] && !message?.name) {
    const newMessage = actions.setMessage();
    setMessage(newMessage);
  }

  const onStartChangeUserMessage = () => {
    setMessage((prev) => ({ ...prev, isMessageEdit: true }));
  };

  const changeMessage = (_, value) => {
    setMessage((prev) => ({ ...prev, message: value }));
  };

  const onMessageSave = () => {
    setMessage((prev) => ({ ...prev, isMessageEdit: false }));
  };

  return {
    message,
    onStartChangeUserMessage,
    changeMessage,
    onMessageSave,
    onDeleteMessage: actions.onDeleteMessage,
  };
}
