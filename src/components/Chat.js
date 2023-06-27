import React, { useCallback, useContext, useEffect, useState } from "react";
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
import styled from "@emotion/styled";
import iconSrc from "../public/icons8-star-wars-1344.png";
import { fetchMessages, fetchThousandMessages } from "../utils.js/fetchPeople";
import Leia from ".././public/avatar/leia-organa.jpg";
import DartVaider from ".././public/avatar/Dart Waider.jpg";
import Luke from ".././public/avatar/Luke_Skywalker.jpg";
import Owen from ".././public/avatar/Owen-lars.jpg";
import { useSelector, useDispatch } from "./ContextProvider";

export const imgConfig = {
  "Luke Skywalker": Luke,
  "Darth Vader": DartVaider,
  "Leia Organa": Leia,
  "Owen Lars": Owen,
};

export function Chat() {
  const messagesById = useSelector();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState();
  const [sortMessages, setSortMessages] = useState();

  const sendMessage = () => {
    dispatch({
      type: "sendMessage",
      payload: {
        inputValue,
      },
    });
  };

  const onSort = () => {
    setSortMessages((prev) => !prev);
  };

  return (
    <Root>
      <StarwarsIcon src={iconSrc} />
      <ContentWrapper>
        <TitleBlock>
          <StarWarsTitle variant="h2">Чат повстанцев</StarWarsTitle>
          <Button onClick={onSort}>SORT</Button>
        </TitleBlock>
        <AppBox>
          <List>
            {Object.keys(messagesById)
              .sort((a, b) => (!sortMessages ? a - b : b - a))
              .map((id) => {
                const message = messagesById[id];
                return (
                  <Message
                    key={id}
                    message={message}
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
    message,
  }) => {
    const dispatch = useDispatch()

    const onDeleteMessage = (messageId) => {
      dispatch({
        type: "onDeleteMessage",
        payload: {
          messageId,
        },
      });
    };
  
    const onStartChangeUserMessage = (messageId) => {
      dispatch({
        type: "onStartChangeUserMessage",
        payload: {
          messageId,
        },
      });
    };
  
    const changeMessage = (messageId, value) => {
      dispatch({
        type: "changeMessage",
        payload: {
          messageId,
          value,
        },
      });
    };
  
    const onMessageSave = (messageId) => {
      dispatch({
        type: "onMessageSave",
        payload: {
          messageId,
        },
      });
    };

    return (
      <Box>
        <ListItem
          key={id}
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
