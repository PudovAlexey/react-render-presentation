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
  userIds: [],
  userDict: {},
  modifiers: {},
});
export function ContextProvider({ children }) {
  const [userIds, setUserIds] = useState([]);
  const [userDict, setUserDict] = useState({});

  if (!userIds.length) {
    (async function getPeople() {
      const people = await fetchPeople();
      const userIds = [];
      people.results.forEach((user, idx) => {
        if (imgConfig[user.name]) {
          userIds.push(idx);
        }
      });

      const usersDict = people.results.reduce((acc, user, id) => {
        if (userIds.includes(id)) {
          console.log(id, imgConfig[user.name]);
          user.img = imgConfig[user.name];
          user.message = generateRandomMessageByUserName(user.name);
          user.isMessageEdit = false;
          acc[id] = user;
        }
        return acc;
      }, {});

      setUserIds(userIds);
      setUserDict(usersDict);
    })();
  }

  function generateMessages() {
    const generateIds = new Array(1000).fill("").map((_, id) => id + 10);

    const usersDict = generateIds.reduce((acc, id) => {
      const randomUserIndex = makeRandomUnit(
        0,
        Object.keys(userDict).length - 1
      );
      const cloneUserValue = { ...Object.values(userDict)[randomUserIndex] };
      cloneUserValue.message = generateRandomMessageByUserName(
        cloneUserValue.name
      );
      acc[id] = cloneUserValue;
      return acc;
    }, {});

    setUserIds(generateIds);
    setUserDict(usersDict);
  }

  return (
    <Context.Provider
      value={{
        userIds,
        setUserIds,
        userDict,
        setUserDict,
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
