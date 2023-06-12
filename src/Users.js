import { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import { Context } from "./rendering-examples/context-example/ContextProvider";
import { setUserHairColor } from "./utils.js/setUserHairColor";
import dartVaider from "./avatar/dart vaider.jpg";
import luke from "./avatar/luke-skywalker-yelling.jpg";
import styled from "@emotion/styled";

export function Users() {
  const anchorEl = useRef();
  const { userNames, userDict, onAddMoreUsers } = useContext(Context);
  const [userId, setUserId] = useState([]);
  const [usersById, setUsersById] = useState({});
  const [sortType, setSortType] = useState("asc");
  const [lukeAnswer, setLukeAnswer] = useState(null);
  const [showDartWaider, setShowDartVaider] = useState(false);

  useEffect(() => {
    setUserId(userNames);
    setUsersById(userDict);
  }, [userNames, userDict]);

  const addUser = () => {};

  function onSort() {}

  const changeUserHairColor = (name) => {};

  const onDeleteUser = (userName) => {};

  return (
    <Root>
      <AppBox>
        <Box>
          <Typography variant="h3">STAR WARS</Typography>
          <Button onClick={onSort}>SORT</Button>
          <Button onClick={onAddMoreUsers}>Навалить пользователей</Button>
        </Box>
        {lukeAnswer && <Typography>Luke, I am your father</Typography>}
        <List>
          {userId.map((userName) => {
            const user = usersById[userName];
            return (
              <Box>
                <ListItem
                  key={userName}
                  secondaryAction={
                    <Box>
                      <Button onClick={() => changeUserHairColor(user.name)}>
                        CHANGE USER
                      </Button>
                      <Button onClick={() => onDeleteUser(user.name)}>
                        DELETE USER
                      </Button>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      ref={(ref) => {
                        if (userName === "Luke Skywalker 0") {
                          anchorEl.current = ref;
                        }
                      }}
                      src={user.img}
                    ></Avatar>
                  </ListItemAvatar>
                  <Box>
                    <Typography>{user.name}</Typography>
                    <Typography color={"red"}>{user.hair_color}</Typography>
                  </Box>
                </ListItem>
                <Divider />
              </Box>
            );
          })}
        </List>
        <Popover
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={!!lukeAnswer}
          anchorEl={anchorEl.current}
          onClick={() => {
            setLukeAnswer(null);
            setShowDartVaider(false);
          }}
        >
          <Paper>
            <LukeImg src={luke} />
            <LukeSay variant="h3">{lukeAnswer}</LukeSay>
          </Paper>
        </Popover>
        <Button onClick={addUser}>ADD USER</Button>
      </AppBox>
      {showDartWaider && (
        <DartVaiderBlock>
          <DartVaiderImg src={dartVaider} />
          <DartVaiderSign variant="h3">Luke, I am your father</DartVaiderSign>
        </DartVaiderBlock>
      )}
    </Root>
  );
}

const Root = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  gap: "10px",
  height: "100vh",
});

const AppBox = styled(Paper)({
  padding: "2rem 3rem",
  width: "30%",
  zIndex: 5,
  position: "relative",
  overflow: "auto",
});

const DartVaiderBlock = styled(Box)({
  left: "50px",
  position: "absolute",
  top: "75px",
  height: "fit-content",
  zIndex: 1000,
});

const DartVaiderImg = styled("img")({
  height: "700px",
});

const DartVaiderSign = styled(Typography)({
  position: "absolute",
  bottom: "50px",
  left: "15%",
  color: "white",
});

const LukeSay = styled(Typography)({
  position: "absolute",
  bottom: "50px",
  color: "white",
});

const LukeImg = styled("img")({
  height: "300px",
});
