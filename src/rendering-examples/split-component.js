import { useContext, useEffect, useState } from "react";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { Context } from "./context-example/ContextProvider";

export function Users() {
  const { userNames } = useContext(Context);
  const [state, setState] = useState([]);
  const [sortType, setSortType] = useState("asc");
  const [changeUserByName, setChangeUserByName] = useState();

  useEffect(() => {
    setState(userNames);
  }, [userNames]);

  const addUser = () => {
    setState((prev) => {
      const users = [...prev];
      users.push("Oskar Kuchera");
      return users;
    });
  };

  function onSort() {
    let sortState = state;
    if (sortType === "asc") {
      sortState = state.sort((a, b) => a.localeCompare(b));
      setSortType("desc");
    } else {
      sortState = state.sort((a, b) => b.localeCompare(a));
      setSortType("asc");
    }
    console.log(sortState, "state");
    setState(sortState);
  }

  function onEditLuke() {
    const editLuke = function (user) {
      if (user === "Luke Skywalker") {
        return {
          name: "Luke Skywalker",
          hair_color: "brown",
        };
      }
    };

    setChangeUserByName({
      fn: editLuke,
    });
  }

  return (
    <>
      <Box>
        <Typography variant="h3">SPLIT COMPONENT</Typography>
        <Button onClick={onSort}>SORT</Button>
        <Button onClick={onEditLuke}>SET Luke Skywalker brown hair</Button>
      </Box>
      <List>
        {state.map((user) => {
          return (
            <User
              changeUserByName={changeUserByName}
              key={user}
              user={user}
              setUser={setState}
            />
          );
        })}
      </List>
      <Button onClick={addUser}>ADD USER</Button>
    </>
  );
}

function User({ user, changeUserByName }) {
  const { userDict } = useContext(Context);
  const [state, setState] = useState({});
  useEffect(() => {
    setState(
      userDict[user] || {
        name: user,
        hair_color: "white",
      }
    );
  }, [userDict, user]);

  useEffect(() => {
    console.log(user, "RENDER USER");
  }, [user]);

  useEffect(() => {
    console.log("change");
    if (typeof changeUserByName?.fn === "function") {
      const updateUser = changeUserByName.fn(user);
      if (updateUser) setState(updateUser);
    }
  }, [changeUserByName, user]);

  const changeColor = () =>
    setState((prev) => ({ ...prev, hair_color: "black" }));

  return (
    <ListItem
      secondaryAction={<Button onClick={changeColor}>EDIT USER</Button>}
    >
      <Typography>{state.name}</Typography>
      <Typography color={"red"}>{state.hair_color}</Typography>
    </ListItem>
  );
}
