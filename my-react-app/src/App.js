// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import Homepage from './pages/Homepage/Homepage';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage/RecipeDetailPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/Footer';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
