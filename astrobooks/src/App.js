import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Messages from './components/Messages';
import Login from './components/Login';
import Profile from './components/Profile';
import BookDetails from './components/BookDetails';
import Register from './components/Register';
import { AuthProvider } from './components/AuthContext';   
import PrivateRoute from './components/PrivateRoute'; 
import BookList from './components/BookList';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />

            <Route element={<PrivateRoute />}>
              <Route path="/messages" element={<Messages />} />
              <Route path="/livros/:id" element={<BookDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/livros" element={<BookList />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
