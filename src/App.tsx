import List from "./components/List";
import { themeMain } from "./AppMuiTheme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={themeMain}>
      <List />
    </ThemeProvider>
  );
}

export default App;
