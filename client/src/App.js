import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import { createContext, useReducer } from 'react';

import { initialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
    </>
  )
}

export default App;
