import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Messages from './components/Messages';

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
