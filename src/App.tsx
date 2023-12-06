// import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Layout from "./components/layout/Layout";
import { BrowserRouter } from "react-router-dom";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

function App() {
  return (
    // <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
