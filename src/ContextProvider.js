import { createContext, useContext, useEffect, useState } from "react";
import { fetchPeople } from "./utils.js/fetchPeople";

import Leia from "././public/avatar/leia-organa.jpg";
import DartVaider from "././public/avatar/Dart Waider.jpg";
import Luke from "././public/avatar/Luke_Skywalker.jpg";
import CPio from "././public/avatar/c-3pio.jpg";
import Owen from "././public/avatar/Owen-lars.jpg";
import R2D2 from "././public/avatar/r2-d2.jpeg";

const imgConfig = {
  "Luke Skywalker": Luke,
  "C-3PO 1": CPio,
  "R2-D2": R2D2,
  "Darth Vader": DartVaider,
  "Leia Organa": Leia,
  "Owen Lars": Owen,
};

export const Context = createContext({
  userNames: [],
  userDict: {},
  modifiers: {},
});
export function ContextProvider({ children }) {
  const [userNames, setUserNames] = useState([]);
  const [userDict, setUserDict] = useState({});

  if (!userNames.length) {
    (async function getPeople() {
      const people = await fetchPeople();
      const indexPeopleNames = people.results.map((user, idx) => ({
        ...user,
        name: `${user.name} ${idx}`,
      }));

      const usersDict = indexPeopleNames.reduce((acc, user) => {
        const clearName = user.name.replace(/\d/g, "").trim();
        user.img = imgConfig[clearName];
        acc[user.name] = user;
        return acc;
      }, {});

      setUserNames(indexPeopleNames.map(({ name }) => name));
      setUserDict(usersDict);
    })();
  }

  function onAddMoreUsers() {
    let count = 0;
    const rushPepole = new Array(1000).fill("").reduce((acc, _, index) => {
      const person = userNames[count]
        ? { ...userDict[userNames[count]] }
        : null;

      if (person) {
        const clearName = person.name.replace(/\d/g, "").trim();
        count++;
        person.name = `${clearName} ${index}`;
        acc.push(person);
      } else {
        count = 0;
      }

      return acc;
    }, []);

    const usersDict = rushPepole.reduce((acc, user) => {
      const clearName = user.name.replace(/\d/g, "").trim();
      user.img = imgConfig[clearName];

      acc[user.name] = user;
      return acc;
    }, {});

    setUserNames(rushPepole.map(({ name }) => name));
    setUserDict(usersDict);
  }

  return (
    <Context.Provider
      value={{
        userNames,
        setUserNames,
        userDict,
        setUserDict,
        onAddMoreUsers,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useUserContext() {
  return useContext(Context);
}
