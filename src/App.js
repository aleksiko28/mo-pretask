import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Requests from "./components/Requests";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

const muiTheme = createMuiTheme({
  palette: {
    primary: { main: "#36a2e7", contrastText: "#fff" },
    secondary: {
      main: "#DC45B8"
    },
    white: {
      main: "#fff"
    },
    grey: {
      main: "#808080"
    }
  },
  typography: {
    fontFamily: `"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif`
  }
});

function App() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <div className="App">
        <Navbar />
        <Requests />
        <Sidebar />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
