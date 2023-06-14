import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import background from "../public/background.jpg";
import { Context } from "../ContextProvider";
import { setUserHairColor } from "../utils.js/setUserHairColor";
import dartVaider from ".././public/avatar/dart vaider.jpg";
import luke from ".././public/avatar/luke-skywalker-yelling.jpg";
import styled from "@emotion/styled";
import iconSrc from "../public/icons8-star-wars-1344.png";

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
      <StarwarsIcon src={iconSrc} />
      <ContentWrapper>
        (
        <DartVaiderBlock visibility={!!showDartWaider ? "visible" : "hidden"}>
          <DartVaiderImg src={dartVaider} />
          <DartVaiderSign variant="h3">Luke, I am your father</DartVaiderSign>
        </DartVaiderBlock>
        )
        <AppBox>
          <TitleBlock>
            <StarWarsTitle variant="h2">Персонажи STAR&nbsp;WARS</StarWarsTitle>
            <Button onClick={onSort}>SORT</Button>
            <Button onClick={onAddMoreUsers}>Навалить пользователей</Button>
            <Button onClick={onShowDartVaider}>Показать Дарта Вейдера</Button>
          </TitleBlock>
          {lukeAnswer && <Typography>Luke, I am your father</Typography>}
          <List>
            {userId.map((userName) => {
              return (
                <User
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
          <YodaButton variant="contained" onClick={() => addUser("YODA")}>
            ADD YODA
          </YodaButton>
        </AppBox>
      </ContentWrapper>
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
            <Button
              variant="contained"
              color="success"
              onClick={changeUserHairColor}
            >
              CHANGE USER
            </Button>
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
  position: "relative",
  height: "100vh",
  width: "100vw",
  backgroundImage: `url(${background})`,
});

const ContentWrapper = styled(Box)({
  position: "absolute",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  top: "50px",
  bottom: "50px",
  left: 0,
  right: 0,
});

const YodaButton = styled(Button)({
  textAlign: "center",
  width: "100%",
});

const StarWarsTitle = styled(Typography)({
  color: "black",
  textShadow: "-3px 3px 0px #fd0",
});

const TitleBlock = styled(Box)({
  textAlign: "center",
});

const StarwarsIcon = styled("img")({});

const AppBox = styled(Paper)({
  padding: "2rem 3rem",
  zIndex: 5,
  overflow: "auto",
  height: "100%",
});

const DartVaiderBlock = styled(Box)({
  zIndex: 1000,
  position: "relative",
});

const DartVaiderImg = styled("img")({
  height: "80vh",
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
