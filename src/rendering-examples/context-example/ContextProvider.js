import { createContext, useContext, useEffect, useState } from "react";
import { fetchPeople } from "../../utils.js/fetchPeople";

import Leia from "../../avatar/leia-organa.jpg";
import DartVaider from "../../avatar/Dart Waider.jpg";
import Luke from "../../avatar/Luke_Skywalker.jpg";
import CPio from "../../avatar/c-3pio.jpg";
import Owen from "../../avatar/Owen-lars.jpg";
import R2D2 from "../../avatar/r2-d2.jpeg";

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
  const [modifiers, setModifiers] = useState({});

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
        userDict,
        setUserNames,
        setUserDict,
        modifiers,
        setModifiers,
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

export function useUserDictById(id) {
  const { userDict, setModifiers } = useContext(Context);
  const user = userDict[id];
  const [state, setState] = useState(user || {});

  useEffect(() => {
    setState(userDict[id]);
  }, [userDict, id]);

  if (!user && !state?.name) {
    setState({
      name: id,
      hair_color: "white",
    });
  }
  const changeColor = () =>
    setState((prev) => ({
      ...prev,
      hair_color: "black",
    }));

  useEffect(() => {
    if (user?.name === "Luke Skywalker") {
      const changeLukSkyWalker = () => {
        setState({
          name: "Luke Skywalker",
          hair_color: "brown",
        });
      };

      setModifiers((prev) => ({
        ...prev,
        changeLukSkyWalker,
      }));
    }
  }, []);

  return {
    userDictById: state,
    setUserDictById: setState,
    changeColor,
  };
}

export function useUserList() {
  const { userNames, modifiers } = useContext(Context);
  const [state, setState] = useState(userNames);
  const [sortType, setSortType] = useState("asc");

  useEffect(() => {
    setState(userNames);
  }, [userNames]);

  function onSort() {
    let sortState = state;
    if (sortType === "asc") {
      sortState = state.sort((a, b) => a.localeCompare(b));
      setSortType("desc");
    } else {
      sortState = state.sort((a, b) => b.localeCompare(a));
      setSortType("asc");
    }
    setState(sortState);
  }

  function addUser() {
    setState((prev) => {
      const users = [...prev];
      users.push("Oskar Kuchera");
      return users;
    });
  }

  return {
    userNames: state || userNames,
    setUserNames: setState,
    onSort,
    addUser,
    onChangLukSkayWalker: modifiers.changeLukSkyWalker,
  };
}
