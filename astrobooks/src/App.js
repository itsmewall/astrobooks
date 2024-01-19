import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Messages from './components/Messages';
// Remova a linha abaixo, pois o componente Header não está sendo utilizado
// import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/messages/:id" element={<Messages />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
