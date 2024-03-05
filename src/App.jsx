// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SighUp from './pages/SighUp';
import SighIn from './pages/SighIn';
import Profile from './pages/Profile';


function App() {

  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sighup" element={<SighUp />} />
          <Route path="/sighin" element={<SighIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
