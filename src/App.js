import logo from "./logo.svg";
import "./App.css";
import { Users as SingleExample } from "./rendering-examples/single-component";
import { Users as SingleExampleMemo } from "./rendering-examples/single-component-memo";
import { Users as SplitComponent } from "./rendering-examples/split-component";
import { Users as ContextExample } from "./rendering-examples/context-example/ContextExample";
import { ContextProvider } from "./rendering-examples/context-example/ContextProvider";
import { Box, Button, Paper } from "@mui/material";
import { Routes } from "react-router";
import { Link, Route } from "react-router-dom";

const menuButtons = [
  { text: "SINGLE COMPONENT", to: "/single_component" },
  { text: "SPLIT COMPONENT", to: "/split_component" },
  { text: "CONTEXT EXAMPLE", to: "/context_example" },
  { text: "SINGLE COMPONENT MEMO", to: "/single_component_memo" },
];

function App() {
  return (
    <Box className="App">
      <ContextProvider>
        <Paper>
          {menuButtons.map(({ text, to }) => {
            return (
              <Button>
                <Link to={to}>{text}</Link>
              </Button>
            );
          })}
        </Paper>
        <Box className={"App__box"}>
            <Routes>
              <Route path="/single_component" element={<Paper className="App__box"><SingleExample /></Paper>} />
              <Route path="/split_component" element={<Paper className="App__box"><SplitComponent /></Paper>} />
              <Route path="/context_example" element={<Paper className="App__box"><ContextExample /></Paper>} />
              <Route
                path="/single_component_memo"
                element={<Paper className="App__box"><SingleExampleMemo /></Paper>}
              />
            </Routes>
        </Box>
      </ContextProvider>
    </Box>
  );
}

export default App;
