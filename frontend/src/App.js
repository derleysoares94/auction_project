import * as React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react'
import Login from './routes/login';
import Home from './routes/home';
import { AuthProvider } from './context/useAuth';
//import PrivateRoute from './components/private_route';
import Register from './routes/register';

function App() {
  return (
    <ChakraProvider>
      <Flex minH='100vh' w='100%' justifyContent='center' alignItems='center'>
        <Router>
          <AuthProvider>
            <Routes>
              {/* TODO: Verify why using <PrivateRoute></PrivateRoute> for wrapping 
                        and protecting the Home to not be accessed from Unauthenticated 
                        user. 
              */}
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route element={<Register />} path='/register' />
            </Routes>
          </AuthProvider >
        </Router>
      </Flex>
    </ChakraProvider>
  );
}

export default App;