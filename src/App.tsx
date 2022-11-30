import { useState } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ChakraProvider, Flex, Heading, Input, useDisclosure, Image, Text, useToast } from "@chakra-ui/react";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import theme from "./styles/theme";
import React from "react";
import { AuthProvider, useAuth } from "./context/auth";
import { Song, User } from "./types/models";
import { SongTable } from "./components/songTable";
import Penyanyi from "./pages/penyanyi";
import Index from "./pages/index";
import Admin from './pages/admin';

function App() {

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
        <Routes>
          <Route path='/user' element={<Penyanyi />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
        
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
    
  );
}

export default App;
