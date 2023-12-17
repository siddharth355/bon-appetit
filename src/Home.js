// Home.js

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Typography, Row, message } from "antd";
import { app } from './base.js';
import TopHeader from "./TopHeader";
import FooterBottom from "./FooterBottom";
import ChefCards from "./ChefCards";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './base'; 

const { Title } = Typography;

const Home = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favoritesMap, setFavoritesMap] = useState(new Map());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        history.push("/login");
      }
    });
    // Fetch favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritesMap = new Map(storedFavorites.map((chef) => [chef.id, chef]));
    setFavoritesMap(favoritesMap);

    return () => {
      unsubscribe();
    };
  }, [history]);
  const handleSignOut = async () => {
    try {
      await auth.signOut(); // Use 'auth' directly
      history.push("/login");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const handleAddToFavorites = (chef) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const existingFavoriteIndex = storedFavorites.findIndex(
        (favorite) => favorite.id === chef.id
      );

      if (existingFavoriteIndex === -1) {
        storedFavorites.push({ ...chef, favoriteId: chef.id });
        localStorage.setItem("favorites", JSON.stringify(storedFavorites));
        setFavoritesMap(new Map(storedFavorites.map((chef) => [chef.id, chef])));

        message.success("Chef added to favorites!");
      } else {
        storedFavorites.splice(existingFavoriteIndex, 1);
        localStorage.setItem("favorites", JSON.stringify(storedFavorites));
        setFavoritesMap(new Map(storedFavorites.map((chef) => [chef.id, chef])));

        message.warning("Chef removed from favorites!");
      }
    }, 1000);
  };

  const chefsData = [
    {
      id: 1,
      name: "Chef John",
      experience: 10,
      recipes: 50,
      likes: 100,
      image: "chef1.jpg",
    },
    {
      id: 2,
      name: "Chef Emily",
      experience: 8,
      recipes: 40,
      likes: 80,
      image: "chef2.jpg",
    },
    {
      id: 3,
      name: "Chef Michael",
      experience: 12,
      recipes: 60,
      likes: 120,
      image: "chef3.jpg",
    },
    {
      id: 4,
      name: "Chef Sarah",
      experience: 6,
      recipes: 30,
      likes: 60,
      image: "chef4.jpg",
    },
    {
      id: 5,
      name: "Chef David",
      experience: 15,
      recipes: 75,
      likes: 150,
      image: "chef5.jpg",
    },
    {
      id: 6,
      name: "Chef Olivia",
      experience: 9,
      recipes: 45,
      likes: 90,
      image: "chef6.jpg",
    },
    {
      id: 7,
      name: "Chef Olivia",
      experience: 9,
      recipes: 45,
      likes: 90,
      image: "chef6.jpg",
    },
    {
      id: 8,
      name: "Chef Olivia",
      experience: 9,
      recipes: 45,
      likes: 90,
      image: "chef6.jpg",
    },
    // Add more chef data as needed
  ];

  const handleViewRecipes = (chefId) => {
    history.push(`/chef/${chefId}/recipes`);
  };

  return (
    <div>
      <TopHeader />

      <div style={{ padding: "20px" }}>
        <Title level={2}>Welcome, {user ? user.displayName : "User"}!</Title>
        <Row gutter={[16, 16]}>
          <ChefCards
            chefsData={chefsData}
            handleViewRecipes={handleViewRecipes}
            handleAddToFavorites={handleAddToFavorites}
            loading={loading}
            favoritesMap={favoritesMap}
          />
        </Row>
        <Button
          type="primary"
          onClick={handleSignOut}
          style={{ marginTop: 16 }}
        >
          Sign out
        </Button>
      </div>
      <FooterBottom />
    </div>
  );
};

export default Home;
