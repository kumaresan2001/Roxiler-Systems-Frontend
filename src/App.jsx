import TransactionsTable from "./components/TransactionsTable";
import { BarChart } from "./components/TransactionsBarChart";
import "./App.css";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
function App() {
  const Navigate = useNavigate();
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const bgstyles = {
    borderRadius: "0px",
    minHeight: "100vh",
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={bgstyles} elevation={4}>
        <div className="app">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={() => Navigate("/")}>
                TABLE
              </Button>
              <Button color="inherit" onClick={() => Navigate("/bar-chart")}>
                BAR CHART
              </Button>

              <Button
                color="inherit"
                variant="containd"
                startIcon={
                  mode === "light" ? <Brightness7Icon /> : <Brightness4Icon />
                }
                onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                sx={{ marginLeft: "auto" }}
              >
                {mode === "dark" ? "light" : "dark"}mode
              </Button>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<TransactionsTable />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
