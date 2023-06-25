import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import background from "../public/background.jpg";
import { Link } from "react-router-dom";

export function StaticIntro() {
  return (
    <Root>
      <Titles>
        <TitleContent>
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
          <StarWarsButton>
            <StarWarsLink to="/list">
              {"Ну теперь точно погнали!!!)))"}
            </StarWarsLink>
          </StarWarsButton>
        </TitleContent>
      </Titles>
    </Root>
  );
}

const Root = styled(Box)({
  height: "100vh",
  backgroundImage: `url(${background})`,
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
});

const TitleContent = styled(Box)({
  height: "100%",
});

const StarWarsLink = styled(Link)({
  color: "#fd0",
  textDecoration: "none",
});

const StarWarsButton = styled(Button)({
  marginTop: "20px",
  border: "2px solid #fd0",
  borderRadius: "20px",
  fontSize: "350%",
});

const Titles = styled(Box)({
  textAlign: "center",
  maxWidth: "50%",
  margin: "auto auto",
  border: "5px solid #fd0",
  padding: "5px",
  borderRadius: "10px",
  color: "#fd0",
  letterSpacing: "2px",
  height: "90vh",
  overflow: "auto",
});
