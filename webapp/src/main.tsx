import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthProvider";
import "./index.css";

const theme = extendTheme(
  {
    fonts: {
      body: "Kanit,Roboto, sans-serif",
      heading: "Kanit,Roboto, sans-serif",
    },
    styles: {
      global: {
        body: {
          bg: "gray.200",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "twitter" })
);

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
