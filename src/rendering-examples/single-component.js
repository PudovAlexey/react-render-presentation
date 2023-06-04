import { useContext, useEffect, useState } from "react";
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

  const changeUser = (name) =>
    setUsersByName((prev) => {
      return {
        ...prev,
        [name]: { name: prev[name]?.name || name, hair_color: "black" },
      };
    });

  return (
    <>
      <Box>
        <Typography variant="h3">SINGLE COMPONENT</Typography>
        <Button onClick={onSort}>SORT</Button>
      </Box>
      <List>
        {state.map((userName) => {
          const user = usersByName[userName];
          console.log(userName, "CHANGE USER");
          return (
            <Box key={userName}>
              <ListItem
                secondaryAction={
                  <ListItemButton onClick={() => changeUser(user.name)}>
                    CHANGE USER
                  </ListItemButton>
                }
                key={user.name}
              >
                <Typography>{user.name}&nbsp;</Typography>
                <Typography color={"red"}>{user.hair_color}</Typography>
              </ListItem>
            </Box>
          );
        })}
      </List>
      <Button onClick={addUser}>ADD USER</Button>
    </>
  );
}
