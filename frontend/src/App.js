import * as React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react'
import Login from './routes/login';
import Home from './routes/home';
import { AuthProvider } from './context/useAuth';
import PrivateRoute from './components/private_route';
import Register from './routes/register';
import Layout from './components/layout';
import Cookies from "js-cookie";

function App() {
  return (
    <ChakraProvider>
      <Flex minH='100vh' w='100%' justifyContent='center' alignItems='center'>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route element={<Register />} path='/register' />

              <Route path='/' element={<PrivateRoute><Layout><Home /></Layout></PrivateRoute>} />
            </Routes>
          </AuthProvider >
        </Router>
      </Flex>
    </ChakraProvider>
  );
}

export default App;