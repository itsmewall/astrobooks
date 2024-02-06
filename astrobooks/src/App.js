import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Messages from './components/Messages';
import Login from './components/Login';
import Profile from './components/Profile';
import BookDetails from './components/BookDetails';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/livros/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
