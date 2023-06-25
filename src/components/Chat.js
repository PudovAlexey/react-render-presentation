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
import "../index.css";
import background from "../public/background.jpg";
import { Context, imgConfig } from "../ContextProvider";
import styled from "@emotion/styled";
import iconSrc from "../public/icons8-star-wars-1344.png";

export function Chat() {
  const {
    messageIds: initialUserIds,
    messagesDict,
    generateMessages,
  } = useContext(Context);
  const [messageIds, setMessageIds] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [sortMessages, setSortMessages] = useState("asc");
  const [confirmDelition, setConfirmDelition] = useState();
  const ref = useRef();
  const selectedIdsRef = useRef([]);
  ref.current = inputValue;

  useEffect(() => {
    setMessageIds(initialUserIds);
  }, [initialUserIds, messagesDict]);

  const sendMessage = () => {
    const cloneIds = [...messageIds];
    const newId = Math.max(...cloneIds) + 1;
    cloneIds.push(newId);
    setMessageIds(cloneIds);
  };

  const onSort = () => {
    sortMessages === "asc" ? setSortMessages("desc") : setSortMessages("asc");
  };

  const onDeleteMessage = useCallback((messageId) => {
    setMessageIds((prev) => prev.filter((id) => id !== messageId));
  }, []);

  const onDeleteSelectedMessages = () => {
    if (selectedIdsRef.current.length) setConfirmDelition(true);
  };

  const onConfirmDelition = () => {
    setMessageIds((prev) =>
      prev.filter((id) => !selectedIdsRef.current.includes(id))
    );
    setConfirmDelition(false);
    selectedIdsRef.current = [];
  };

  const onCancelDelition = () => {
    setConfirmDelition(undefined);
  };

  return (
    <Root>
      <StarwarsIcon src={iconSrc} />
      <ContentWrapper>
        <TitleBlock>
          <StarWarsTitle variant="h2">Чат повстанцев</StarWarsTitle>
          <Button onClick={onSort}>SORT</Button>
          <Button onClick={generateMessages}>Сгенерить косарь</Button>
          {confirmDelition ? (
            <>
              <Button onClick={onConfirmDelition}>Подтвердить удаление</Button>
              <Button onClick={onCancelDelition}>Отменить удаление</Button>
            </>
          ) : (
            <Button onClick={onDeleteSelectedMessages}>
              Удалить выбранные
            </Button>
          )}
        </TitleBlock>
        <AppBox>
          <List>
            {messageIds
              .sort((a, b) => (sortMessages === "asc" ? a - b : b - a))
              .map((id) => {
                return (
                  <Message
                    setConfirmDelition={setConfirmDelition}
                    confirmDelition={confirmDelition}
                    selectedIdsRef={selectedIdsRef}
                    inputValue={ref}
                    setInputValue={setInputValue}
                    key={id}
                    onDeleteMessage={onDeleteMessage}
                    id={id}
                  />
                );
              })}
          </List>
        </AppBox>
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
      </ContentWrapper>
    </Root>
  );
}

const Message = React.memo(
  ({
    id,
    inputValue,
    setInputValue,
    onDeleteMessage,
    selectedIdsRef,
    confirmDelition,
    setConfirmDelition
  }) => {
    const { messagesDict } = useContext(Context);
    const selectedBox = useRef();
    const [message, setMessage] = useState();

    if (!message && messagesDict[id]) {
      setMessage(messagesDict[id]);
      return null;
    }

    if (!message) {
      const newMessage = {
        name: "Darth Vader",
        message: inputValue.current,
        isMessageEdit: false,
        img: imgConfig["Darth Vader"],
      };
      setMessage(newMessage);
      setInputValue("");
      return null;
    }

    const onStartChangeUserMessage = () => {
      setMessage((prev) => ({ ...prev, isMessageEdit: true }));
    };

    const changeMessage = (_, value) => {
      setMessage((prev) => ({ ...prev, message: value }));
    };

    const onMessageSave = () => {
      setMessage((prev) => ({ ...prev, isMessageEdit: false }));
    };

    const onSelectMessage = () => {
      if (confirmDelition) {
        return;
      }

      message?.isSelected
        ? (selectedIdsRef.current = selectedIdsRef.current.filter(
            (messageId) => messageId !== id
          ))
        : selectedIdsRef.current.push(id);
      setMessage((prev) => ({ ...prev, isSelected: !prev?.isSelected }));
      if (selectedIdsRef.current.length) setConfirmDelition(false);
    };

    if (selectedIdsRef.current.includes(id) && confirmDelition) {
      selectedBox.current.style = "animation: .05s infinite alternate shake;";
    }

    if (confirmDelition === undefined && message?.isSelected) {
      setMessage((prev) => ({ ...prev, isSelected: false }));
      selectedBox.current.style = "";
    }

    return (
      <Box
        ref={selectedBox}
        onClick={onSelectMessage}
        color={{ background: message?.isSelected && "#08cdcf" }}
      >
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
            <Typography fontWeight={"bold"}>{message.name}</Typography>
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
  }
);

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
  paddingBottom: "30px",
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
  paddingBottom: "50px",
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
  width: "70%",
});

const MessageInputBlockWrapper = styled(Paper)({
  position: "relative",
  bottom: "-100px",
  right: "0%",
  width: "100%",
  left: "0%",
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
