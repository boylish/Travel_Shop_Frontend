import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ToasterConfig from './components/ToasterConfig';
import Login from './Pages/Login';
import Home from './Pages/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="relative h-screen w-full">
        {!isLoggedIn && (
          <div className="fixed inset-0 -z-10 opacity-30  pointer-events-none overflow-hidden">
            <Home />
          </div>
        )}

        <div className="relative z-10 h-full">
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/home"
              element={isLoggedIn ? <Home /> : <Navigate to="/" />}
            />
            <Route path="*" element={<h2>404 - Not Found</h2>} />
          </Routes>
        </div>
        <ToasterConfig />
      </div>
    </Router>
  );
}

export default App;
