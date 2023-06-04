import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import { useUserDictById, useUserList } from "./ContextProvider";
import React, { useEffect } from "react";

export function Users() {
  const { userNames, onSort, addUser, onChangLukSkayWalker } = useUserList();

  return (
    <>
      <Box>
        <Typography variant="h3">CONTEXT EXAMPLE</Typography>
        <Button onClick={onSort}>SORT</Button>
        <Button onClick={onChangLukSkayWalker}>
          SET Luke Skywalker brown hair
        </Button>
      </Box>
      <List>
        {userNames.map((user) => {
          return (
            <Box key={user}>
              <User key={user} user={user} />
              <Divider />
            </Box>
          );
        })}
      </List>
      <Button type="conains" onClick={addUser}>
        ADD USER
      </Button>
    </>
  );
}

function User({ user }) {
  const { userDictById, changeColor } = useUserDictById(user);

  console.log(user, "RENDER USER OUTSIDE");

  useEffect(() => {
    console.log(user, "RENDER USER");
  }, [user]);
  if (!userDictById) return null;

  return (
    <ListItem
      secondaryAction={
        <ListItemButton variant="contained" onClick={changeColor}>
          EDIT USER
        </ListItemButton>
      }
    >
      <Typography>{userDictById.name}&nbsp;</Typography>
      <Typography color={"red"}>{userDictById.hair_color}</Typography>
    </ListItem>
  );
}
