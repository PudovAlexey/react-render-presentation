import { Box, Button, Paper } from "@mui/material";
import "./App.css";
import { Result } from "./Result";
import { Users } from "./Users";
import { ContextProvider } from "./rendering-examples/context-example/ContextProvider";
import { StarWarsIntro } from "./components/StarWarsIntro/StarWarsIntro";
import { Route, Routes } from "react-router";
import { Start } from "./components/Start";

function App() {
  return (
    <Box className="App">
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/intro" element={<StarWarsIntro />}></Route>
          <Route path="/list" element={<Users/>}></Route>
        </Routes>
      </ContextProvider>
    </Box>
  );
}

export default App;
