import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import { Context } from "./context-example/ContextProvider";

export function Users() {
  const { userNames, userDict } = useContext(Context);
  const [state, setState] = useState([]);
  const [usersByName, setUsersByName] = useState({});
  const [sortType, setSortType] = useState("asc");

  function onChangLukSkayWalker() {
    setUsersByName((prev) => ({
      ...prev,
      ["Luke Skywalker"]: {
        name: "Luke Skywalker",
        hair_color: "brown",
      },
    }));
  }

  useEffect(() => {
    console.log(userNames, "render");
  }, [userNames]);

  useEffect(() => {
    setState(userNames);
    setUsersByName(userDict);
  }, [userNames, userDict]);

  const addUser = () => {
    setState((prev) => {
      changeUser("Oskar Kuchera");
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

  const changeUser = useCallback(
    (name) =>
      setUsersByName((prev) => {
        return {
          ...prev,
          [name]: { name: prev[name]?.name || name, hair_color: "black" },
        };
      }),
    []
  );

  return (
    <>
      <Box>
        <Typography variant="h3">SINGLE COMPONENT MEMO</Typography>
        <Button onClick={onSort}>SORT</Button>
        <Button onClick={onChangLukSkayWalker}>
          SET Luke Skywalker brown hair
        </Button>
      </Box>
      <List>
        {state.map((userName) => {
          return <User changeUser={changeUser} user={usersByName[userName]} />;
        })}
      </List>
      <Button onClick={addUser}>ADD USER</Button>
    </>
  );
}

function User({ user, changeUser }) {
  const hair_color = useMemo(() => user.hair_color, [user.hair_color]);
  const userName = useMemo(() => user.name, [user.name]);

  useEffect(() => {
    console.log(userName, "USER NAME");
  }, [userName, hair_color]);

  return (
    <Box key={userName}>
      <ListItem
        secondaryAction={
          <ListItemButton onClick={() => changeUser(userName)}>
            CHANGE USER
          </ListItemButton>
        }
        key={userName}
      >
        <Typography>{userName}&nbsp;</Typography>
        <Typography color={"red"}>{hair_color}</Typography>
      </ListItem>
    </Box>
  );
}
