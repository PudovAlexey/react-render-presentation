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
  TextField,
  Typography,
} from "@mui/material";
import background from "../public/background.jpg";
import { Context, imgConfig } from "../ContextProvider";
import styled from "@emotion/styled";
import iconSrc from "../public/icons8-star-wars-1344.png";
import {
  useActions,
  useChatContext,
  useMessageById,
  useMessageList,
} from "../ChatProvider";

export function Chat() {
  const { inputValue, setInputValue, search, setSearch, sendMessage } = useActions();
  const { messageIds, sortMessages, generateMessages, onSort } =
    useMessageList();

  return (
    <Root>
      <StarwarsIcon src={iconSrc} />
      <ContentWrapper>
        <AppBox>
          <TitleBlock>
            <StarWarsTitle variant="h2">Персонажи STAR&nbsp;WARS</StarWarsTitle>
            <Button onClick={onSort}>SORT</Button>
            <Button onClick={generateMessages}>Сгенерить косарь</Button>
            <TextField
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </TitleBlock>
          <List>
            {messageIds
              .sort((a, b) => (sortMessages === "asc" ? a - b : b - a))
              .map((id) => {
                return <Message key={id} id={id} />;
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

const Message = React.memo(({ id }) => {
  // const {search} = useActions()
  const search = ''
  const {
    message,
    onMessageSave,
    onStartChangeUserMessage,
    changeMessage,
    onDeleteMessage
  } = useMessageById(id);

  if (!message) return null

  let searchSubstring = message?.name?.replace(search, "") || "";

  if ((search + searchSubstring).length !== message?.name?.length) {
    searchSubstring = "";
  }

  return (
    <Box>
      <ListItem
        secondaryAction={
          message.isMessageEdit ? (
            <Button
              color="success"
              variant="contained"
              onClick={() => onMessageSave(id)}
            >
              SAVE
            </Button>
          ) : (
            <Box>
              <Button
                variant="contained"
                color="success"
                onClick={() => onStartChangeUserMessage(id)}
              >
                EDIT MESSAGE
              </Button>
              <Button onClick={() => onDeleteMessage(id)}>
                DELETE MESSAGE
              </Button>
            </Box>
          )
        }
      >
        <ListItemAvatar>
          <Avatar src={message.img}></Avatar>
        </ListItemAvatar>
        <Box>
          {searchSubstring ? (
            <Typography fontWeight={"bold"}>
              <span
                style={{
                  color: "yellow",
                }}
              >
                {search}
              </span>
              <span>{searchSubstring}</span>
            </Typography>
          ) : (
            <Typography fontWeight={"bold"}>{message.name}</Typography>
          )}
          {!message.isMessageEdit ? (
            <MessageTypography>{message.message}</MessageTypography>
          ) : (
            <TextField
              fullWidth
              onChange={(e) => changeMessage(id, e.target.value)}
              value={message.message}
            />
          )}
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
