import { Box } from "@mui/material";
import { StarWarsIntro } from "./components/StarWarsIntro";
import { Route, Routes } from "react-router";
import { Start } from "./components/Start";
import { Chat } from "./components/Chat";
import { StaticIntro } from "./components/StaticIntro";
import { ContextProvider } from "./components/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Box className="App">
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/intro" element={<StarWarsIntro />}></Route>
          <Route path="/static-intro" element={<StaticIntro />}></Route>
          <Route path="/list" element={<Chat />}></Route>
        </Routes>
      </Box>
    </ContextProvider>
  );
}

export default App;
