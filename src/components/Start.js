import { Box,  Button, styled } from "@mui/material";
import { Link } from "react-router-dom";

export function Start() {
  return (
    <Root>
      <Button variant="contained">
        <StyledLink to="/intro">Start</StyledLink>
      </Button>
    </Root>
  );
}

const Root = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "white",
  position: "relative",
  zIndex: 1000,
  color: "black",
  textDecoration: "none",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "white",
});
