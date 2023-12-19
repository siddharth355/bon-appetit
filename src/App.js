import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import About from "./About";
import Favorites from "./Favourites";
import ChefRecipes from "./ChefRecipes"; 
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/favorites" component={Favorites} />
          <PrivateRoute exact path="/chef/:chefId/recipes" component={ChefRecipes} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
