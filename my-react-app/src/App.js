// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import Homepage from "./pages/Homepage/Homepage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage/RecipeDetailPage";
import MyFoodBankPage from "./pages/MyFoodBank/MyFoodBankPage";
import MyRecipeEditorPage from "./pages/MyRecipeEditorPage/MyRecipeEditorPage";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />

          <Route
            path="/my-food-bank"
            element={
              <ProtectedRoute>
                <MyFoodBankPage />
              </ProtectedRoute>
            }
          />

          {/* ONE dynamic route: id will be "new" or a number */}
          <Route
            path="/my-food-bank/recipe/:id"
            element={
              <ProtectedRoute>
                <MyRecipeEditorPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;