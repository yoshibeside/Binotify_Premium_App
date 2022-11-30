import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Register from "./pages/register";
import Penyanyi from "./pages/penyanyi";
import theme from "./styles/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<Penyanyi />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
