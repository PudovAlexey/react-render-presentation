import { Box } from "@mui/material";
import { StarWarsIntro } from "./components/StarWarsIntro";
import { Route, Routes } from "react-router";
import { Start } from "./components/Start";
import { ContextProvider } from "./ContextProvider";
import { Chat } from "./components/Chat";
import { ChatProvider } from "./ChatProvider";

function App() {
  return (
    <Box className="App">
      <ContextProvider>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Start />}></Route>
            <Route path="/intro" element={<StarWarsIntro />}></Route>
            <Route path="/list" element={<Chat />}></Route>
          </Routes>
        </ChatProvider>
      </ContextProvider>
    </Box>
  );
}

export default App;
