import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import { Context } from "./rendering-examples/context-example/ContextProvider";
import { setUserHairColor } from "./utils.js/setUserHairColor";
import dartVaider from "./avatar/dart vaider.jpg";
import luke from "./avatar/luke-skywalker-yelling.jpg";
import styled from "@emotion/styled";

export function Users() {
  const anchorEl = useRef();
  const { userNames, onAddMoreUsers } = useContext(Context);
  const [userId, setUserId] = useState([]);
  const [sortType, setSortType] = useState("asc");
  const [lukeAnswer, setLukeAnswer] = useState(null);
  const [showDartWaider, setShowDartVaider] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    setUserId(userNames);
  }, [userNames]);

  const addUser = (userName) => {
    const updateUsersIds = [...userId];
    updateUsersIds.push(userName);
    setUserId(updateUsersIds);
  };

  function onSort() {
    if (sortType === "asc") {
      const sortedIds = [...userId].sort((a, b) => a.localeCompare(b));
      setUserId(sortedIds);
      setSortType("desc");
    } else if (sortType === "desc") {
      const sortedIds = [...userId].sort((a, b) => b.localeCompare(a));
      setUserId(sortedIds);
      setSortType("asc");
    }
  }

  const onDeleteUser = useCallback((userName) => {
    const exceptUser = userId.filter((name) => name !== userName);

    setUserId(exceptUser);
  }, []);

  const onShowDartVaider = useCallback(() => {
    setLukeAnswer("Noooo!!!");
    setShowDartVaider(true);
  }, []);

  return (
    <Root>
      <AppBox>
        <Box>
          <Typography variant="h3">STAR WARS</Typography>
          <Button onClick={onSort}>SORT</Button>
          <Button onClick={onAddMoreUsers}>Навалить пользователей</Button>
          <Button onClick={onShowDartVaider}>Показать Дарта Вейдера</Button>
          <TextField onChange={(e) => setValue(e.target.value)} value={value}/>
        </Box>
        {lukeAnswer && <Typography>Luke, I am your father</Typography>}
        <List>
          {userId.map((userName) => {
            return (
              <User
                value={value}
                key={userName}
                anchorEl={anchorEl}
                userName={userName}
                onDeleteUser={onDeleteUser}
              />
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
        <Button onClick={() => addUser("YODA")}>ADD YODA</Button>
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

const User = React.memo(({ userName, onDeleteUser, anchorEl, value }) => {
  const { userDict } = useContext(Context);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (userName === "Luke Skywalker 0" && value) {
      setUser(prev => ({
        ...prev,
        hair_color: value,
      }));
    }
  }, [value, userName])

  if (!user.name) {
    const hair_color = setUserHairColor();
    userDict[userName]
      ? setUser(userDict[userName])
      : setUser({
          name: userName,
          hair_color,
        });
    return null;
  }


  const changeUserHairColor = () => {
    const hair_color = setUserHairColor();

    setUser((prev) => ({
      ...prev,
      hair_color,
    }));
  };

  return (
    <Box>
      <ListItem
        secondaryAction={
          <Box>
            <Button onClick={changeUserHairColor}>CHANGE USER</Button>
            <Button onClick={() => onDeleteUser(user.name)}>DELETE USER</Button>
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
});

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
