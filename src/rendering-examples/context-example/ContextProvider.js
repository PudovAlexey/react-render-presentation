import { createContext, useContext, useEffect, useState } from "react";
import { fetchPeople } from "../../utils.js/fetchPeople";

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
      const userDict = people.results.reduce((acc, user) => {
        acc[user.name] = user;
        return acc;
      }, {});

      setUserNames(people.results.slice(0, 5).map(({ name }) => name));
      setUserDict(userDict);
    })();
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
