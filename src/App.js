import { Box } from "@mui/material";
import { StarWarsIntro } from "./components/StarWarsIntro";
import { Route, Routes } from "react-router";
import { Start } from "./components/Start";
import { ContextProvider } from "./ContextProvider";
import { Users } from "./components/Users";

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
