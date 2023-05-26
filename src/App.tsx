import List from "./components/List/List";
import { themeMain } from "./AppMuiTheme";
import { ThemeProvider } from "@mui/material";
import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <ThemeProvider theme={themeMain}>
      <Navbar />
      <List />
    </ThemeProvider>
  );
}

export default App;
