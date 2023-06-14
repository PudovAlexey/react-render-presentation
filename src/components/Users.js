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
      <ContentWrapper>
        <AppBox>
          <TitleBlock>
            <StarWarsTitle variant="h2">Персонажи STAR&nbsp;WARS</StarWarsTitle>
            <Button onClick={onSort}>SORT</Button>
            <Button onClick={onAddMoreUsers}>Навалить пользователей</Button>
          </TitleBlock>
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
                        <Button variant="contained" color="success"  onClick={() => changeUserHairColor(user.name)}>
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
          <YodaButton variant="contained" onClick={() => addUser("YODA")}>
            ADD YODA
          </YodaButton>
        </AppBox>
      </ContentWrapper>
    </Root>
  );
}

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
