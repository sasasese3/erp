import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthProvider";
import "./index.css";

const theme = extendTheme({
  fonts: {
    body: "Roboto, Kanit, sans-serif",
    heading: "Roboto, Kanit, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

axios.defaults.baseURL = "http://localhost:3333";
axios.defaults.withCredentials = true;
