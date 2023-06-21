import React, {
  useContext,
  useEffect,
  useMemo,,
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
import { chatSlice } from "../store/chatSlice";
import { useAtomValue, useSetAtom } from "jotai";

export function Chat() {
  const {
    messageIds: initialMessageIds,
    messagesDict,
    generateMessages,
  } = useContext(Context);
  const messageIds = useAtomValue(chatSlice.state.messageIds);
  const inputValue = useAtomValue(chatSlice.state.inputValue);
  const sortMessages = useAtomValue(chatSlice.state.sortedMessages);
  const search = useAtomValue(chatSlice.state.search);

  const onInit = useSetAtom(chatSlice.actions.onInit);
  const onExit = useSetAtom(chatSlice.actions.onExit);
  const setSearch = useSetAtom(chatSlice.actions.setSearch);
  const onSort = useSetAtom(chatSlice.actions.onSort);
  const setInputValue = useSetAtom(chatSlice.actions.setInputValue);
  const sendMessage = useSetAtom(chatSlice.actions.sendMessage);
  const onNameSearch = useSetAtom(chatSlice.actions.onNameSearch);

  useEffect(() => {
    onInit({ messageIds: initialMessageIds, messagesDict });
    return () => {
      onExit();
    };
  }, [initialMessageIds, messagesDict, onInit, onExit]);

  return (
    <Root>
      <StarwarsIcon src={iconSrc} />
      <ContentWrapper>
        <TitleBlock>
          <StarWarsTitle variant="h2">Персонажи STAR&nbsp;WARS</StarWarsTitle>
          <Button onClick={onSort}>SORT</Button>
          <Button onClick={generateMessages}>Сгенерить косарь</Button>
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <Button onClick={onNameSearch}>Поиск</Button>
        </TitleBlock>
        <AppBox>
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
  const message = useAtomValue(
    useMemo(() => chatSlice.state.getMessageById(id), [id])
  );

  const onStartChangeUserMessage = useSetAtom(
    chatSlice.actions.onStartChangeUserMessage
  );
  const onDeleteMessage = useSetAtom(chatSlice.actions.onDeleteMessage);
  const onMessageSave = useSetAtom(chatSlice.actions.onMessageSave);
  const changeMessage = useSetAtom(chatSlice.actions.changeMessage);

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
          {message?.searchSubstring ? (
            <Typography fontWeight={"bold"}>
              <span
                style={{
                  color: "yellow",
                }}
              >
                {message?.search}
              </span>
              <span>{message?.searchSubstring}</span>
            </Typography>
          ) : (
            <Typography fontWeight={"bold"}>{message.name}</Typography>
          )}
          {!message.isMessageEdit ? (
            <MessageTypography>{message.message}</MessageTypography>
          ) : (
            <TextField
              fullWidth
              onChange={(e) => changeMessage({ id, value: e.target.value })}
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
  overflow: "hidden",
  width: "100vw",
  backgroundImage: `url(${background})`,
});

const ContentWrapper = styled(Paper)({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  top: "30px",
  bottom: "120px",
  left: "50px",
  right: "50px",
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
  display: "flex",
  flexDirection: "column-reverse",
});

const MessageInputBlockWrapper = styled(Paper)({
  position: "fixed",
  bottom: "10px",
  right: "0%",
  width: "94%",
  backgroundColor: "#505050",
  left: "3%",
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
  right: "0%",
  width: "90%",
});

const MessageTypography = styled(Typography)({
  maxWidth: "50%",
});
