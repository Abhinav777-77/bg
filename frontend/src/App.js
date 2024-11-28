import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TitlePage from './pages/TitlePage/Titlepage'; // Import TitlePage component
import LoginPage from './pages/Loginpage/Loginpage';
import './App.css'; // Optional: Import any global CSS styles if necessary
import GenApp from './pages/generatorpage/gen';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TitlePage />} /> {/* Set TitlePage as the main landing page */}
                <Route path="Login" element={<LoginPage/>}></Route>
                <Route path="/generator" element={<GenApp/>}></Route> 
            </Routes>
        </Router> 
    );
}

export default App;  