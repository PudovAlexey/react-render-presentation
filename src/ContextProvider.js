import { createContext, useContext, useState } from "react";
import { fetchPeople } from "./utils.js/fetchPeople";

import Leia from "././public/avatar/leia-organa.jpg";
import DartVaider from "././public/avatar/Dart Waider.jpg";
import Luke from "././public/avatar/Luke_Skywalker.jpg";
import Owen from "././public/avatar/Owen-lars.jpg";
import { generateRandomMessageByUserName } from "./utils.js/generateRandomMessage";
import { makeRandomUnit } from "./utils.js/setUserHairColor";

export const imgConfig = {
  "Luke Skywalker": Luke,
  "Darth Vader": DartVaider,
  "Leia Organa": Leia,
  "Owen Lars": Owen,
};

export const Context = createContext({
  messageIds: [],
  messagesDict: {},
  modifiers: {},
});
export function ContextProvider({ children }) {
  const [messageIds, setmessageIds] = useState([]);
  const [messagesDict, setmessagesDict] = useState({});

  if (!messageIds.length) {
    (async function getPeople() {
      const people = await fetchPeople();
      const messageIds = [];
      people.results.forEach((user, idx) => {
        if (imgConfig[user.name]) {
          messageIds.push(idx);
        }
      });

      const usersDict = people.results.reduce((acc, user, id) => {
        if (messageIds.includes(id)) {
          console.log(id, imgConfig[user.name]);
          user.img = imgConfig[user.name];
          user.message = generateRandomMessageByUserName(user.name);
          user.isMessageEdit = false;
          acc[id] = user;
        }
        return acc;
      }, {});

      setmessageIds(messageIds);
      setmessagesDict(usersDict);
    })();
  }

  function generateMessages() {
    const generateIds = new Array(1000).fill("").map((_, id) => id + 10);

    const usersDict = generateIds.reduce((acc, id) => {
      const randomUserIndex = makeRandomUnit(
        0,
        Object.keys(messagesDict).length - 1
      );
      const cloneUserValue = { ...Object.values(messagesDict)[randomUserIndex] };
      cloneUserValue.message = generateRandomMessageByUserName(
        cloneUserValue.name
      );
      acc[id] = cloneUserValue;
      return acc;
    }, {});

    setmessageIds(generateIds);
    setmessagesDict(usersDict);
  }

  return (
    <Context.Provider
      value={{
        messageIds,
        setmessageIds,
        messagesDict,
        setmessagesDict,
        generateMessages,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useUserContext() {
  return useContext(Context);
}
