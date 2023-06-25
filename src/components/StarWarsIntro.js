import { Box, Button, Typography, styled } from "@mui/material";
import background from "../public/background.jpg";
import iconSrc from "../public/icons8-star-wars-1344.png";
import audioStarWars from "../public/audio.mp3";
import { Link } from "react-router-dom";

export function StarWarsIntro() {
  return (
    <Root>
      <Titles>
        <TitleContent>
          <Typography variant="h2">Эпизод I. Рендеринг в React</Typography>
          <Typography variant="h3">
            Продвинутое руководство по управлению сложностью рендеринга в React
          </Typography>
          <br />
          <Typography variant="h4">
            Во время битвы за производительность, повстанцы овладели множеством
            различных техник по оптимизации рендеринга компонентов в React. Все
            эти техники были очень эффективными и по своему дополняли друг
            друга.
          </Typography>
          <br />
          <br />
          <Typography variant="h4">
            Повстанцы часто одерживали победу, но их средства коммуникации были
            далеки от совершенства. При написании своего чата, они не
            пользовались методами оптимизации компонентов что часто
            оборачивалось поражением в тактических боях.
          </Typography>
          <br />
          <br />
          <Typography variant="h4">
            Основываясь на текущей комбинации изменения родительских
            компонентов, пропсов (props) и состояния (state), повстанцы сумели
            оптимизировать свой чат что позволило спасти галлактику от темных
            сил.
          </Typography>
          <br />
          <br />
          <Typography variant="h4">
            Сегодня мы поговорим о том, как это было...
          </Typography>
        </TitleContent>
      </Titles>

      <StarWarsTitle>
        <StarwarsIcon src={iconSrc} />
      </StarWarsTitle>

      <Intro>
        <p>
          Давным-давно
          <br /> в далекой-далекой
          <br /> галактике...
        </p>
      </Intro>
      <ButtonWrapper>
        <StarWarsButton>
          <StarWarsLink to="/list">Погнали!</StarWarsLink>
        </StarWarsButton>
      </ButtonWrapper>
      <audio autoPlay="autoplay" loop="loop">
        <source autoPlay={true} src={audioStarWars} type="audio/mpeg" />
      </audio>
    </Root>
  );
}

const ButtonWrapper = styled(Box)({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StarWarsButton = styled(Button)({
  border: "2px solid #fd0",
  borderRadius: "20px",
  fontSize: "350%",
  animation: "goMiddle 50s linear 0s 1",

  "@keyframes goMiddle": {
    "0%": {
      opacity: 0,
      transform: "translateY(500px)",
    },
    "95%": {
      opacity: 0,
      transform: "translateY(500px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0px)",
    },
  },
});

const StarWarsLink = styled(Link)({
  color: "#fd0",
  textDecoration: "none",
});

const Root = styled(Box)({
  height: "100vh",
  backgroundImage: `url(${background})`,
  zIndex: 1000,
  position: "relative",
});

const StarwarsIcon = styled("img")({});

const Titles = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  margin: "0 auto",
  width: "14em",
  height: "60em",
  bottom: 0,
  fontSize: "350%",
  fontWeight: "bold",
  textAlign: "justify",
  overflow: "hidden",
  transformOrigin: "50% 100%",
  transform: "perspective(300px) rotateX(15deg)",
  color: "#fd0",
  letterSpacing: "2px",
  "&:after": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(
    rgba(1, 1, 1, 1) 0%,
    rgba(1, 1, 1, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  )`,
    pointerEvents: "none",
    display: "inline-block",
  },
});

const TitleContent = styled(Box)({
  position: "absolute",
  top: "100%",
  animation: "scroll 100s linear 17s infinite",

  "@keyframes scroll": {
    "0%": {
      top: "100%",
    },
    "100%": {
      top: "-100%",
    },
  },
});

const StarWarsTitle = styled(Box)({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0px",
  left: "0px",
  fontSize: "16em",
  fontWeight: "bold",
  textAlign: "center",
  color: "#fd0",
  transformOrigin: "50% 50%",
  animation: "disappear 10s linear 7s 1",
  lineHeight: "1.7em",
  opacity: 0,

  "@keyframes disappear": {
    "0%": {
      transform: "scale(1)",
      opacity: 1,
    },
    "70%": {
      opacity: 0,
    },
    "100%": {
      transform: "scale(0)",
      opacity: 0,
    },
  },
});

const Intro = styled(Box)({
  position: "absolute",
  width: "100%",
  top: "40%",
  left: 0,
  fontSize: "3em",
  textAlign: "center",
  color: "#33a",
  transformOrigin: "50% 50%",
  animation: "intro 7s linear 0s 1 forwards",

  lineHeight: "1.7em",
  backgroundColor: "trasparent",

  "@keyframes intro": {
    "0%": {
      opacity: 0,
    },
    "20%": {
      opacity: 1,
    },
    "80%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
});
