import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import background from "../public/background.jpg";
import { Context, imgConfig } from "../ContextProvider";
import styled from "@emotion/styled";
import iconSrc from "../public/icons8-star-wars-1344.png";

export function Chat() {
  const { userIds, userDict, generateMessages } = useContext(Context);
  const [userId, setUserId] = useState([]);
  const [usersById, setUsersById] = useState({});
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    setUserId(userIds);
    setUsersById(userDict);
  }, [userIds, userDict]);

  const sendMessage = () => {};

  const onSort = () => {};

  const onDeleteMessage = (messageId) => {};

  const onStartChangeUserMessage = (messageId) => {};

  const changeMessage = (messageId, value) => {};

  const onMessageSave = (messageId) => {};

  return (
    <Root>
      <StarwarsIcon src={iconSrc} />
      <ContentWrapper>
        <AppBox>
          <TitleBlock>
            <StarWarsTitle variant="h2">Персонажи STAR&nbsp;WARS</StarWarsTitle>
            <Button onClick={onSort}>SORT</Button>
            <Button onClick={generateMessages}>Сгенерить косарь</Button>
          </TitleBlock>
          <List>
            {userId.map((id) => {
              const user = usersById[id];
              return user.isMessageEdit ? (
                <Button onClick={() => onMessageSave(id)}>SAVE</Button>
              ) : (
                <Box>
                  <ListItem
                    key={id}
                    secondaryAction={
                      <Box>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => onStartChangeUserMessage(user.name)}
                        >
                          EDIT MESSAGE
                        </Button>
                        <Button onClick={() => onDeleteMessage(user.name)}>
                          DELETE MESSAGE
                        </Button>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={user.img}></Avatar>
                    </ListItemAvatar>
                    <Box>
                      <Typography fontWeight={"bold"}>{user.name}</Typography>
                      {!user.isMesageEdit ? (
                        <MessageTypography>{user.message}</MessageTypography>
                      ) : (
                        <TextField
                          onChange={(e) => changeMessage(id, e.target.value)}
                          color="#fff"
                          value={user.message}
                        />
                      )}
                    </Box>
                  </ListItem>
                  <Divider />
                </Box>
              );
            })}
          </List>
          <MessageInputBlockWrapper>
            <MessageInputBlock>
              <Avatar src={imgConfig["Darth Vader"]}></Avatar>
              <TextField
                fullWidth
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
              <SendButton variant="contained" onClick={sendMessage}>
                SEND
              </SendButton>
            </MessageInputBlock>
          </MessageInputBlockWrapper>
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

const SendButton = styled(Button)({
  textAlign: "center",
  width: "10%",
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
  position: "relative",
});

const MessageInputBlockWrapper = styled(Paper)({
  position: "fixed",
  bottom: "10px",
  right: "6%",
  width: "85%",
  backgroundColor: "#505050",
  width: "50%",
  left: 0,
  right: 0,
  margin: "0 auto",
});

const MessageInputBlock = styled(Box)({
  padding: "10px 5%",
  gap: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 5,
  width: "85%",
});

const MessageTypography = styled(Typography)({
  maxWidth: "50%",
});
