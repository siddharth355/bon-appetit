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
    localStorage.setItem('selectedMenuItem', 1);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        history.push("/login");
      }
    });
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritesMap = new Map(storedFavorites.map((chef) => [chef.id, chef]));
    setFavoritesMap(favoritesMap);

    return () => {
      unsubscribe();
    };
  }, [history]);

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
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlN19wb3J0cmFpdF9vZl9hbl9hZnJpY2FuX2FtZXJpY2FuX2ZlbWFsZV9jaGVmX2luX182YTA4OTdkOS02MGYwLTRmNjQtOTcyYy1mZjEyOGEwMDFkNjMucG5n.png",
      recipesData: [
        { id: 1, name: "Recipe 1", description: "Description 1" },
        { id: 2, name: "Recipe 2", description: "Description 2" },
        { id: 3, name: "Recipe 3", description: "Description 3" },
        { id: 4, name: "Recipe 4", description: "Description 4" },
        { id: 5, name: "Recipe 5", description: "Description 5" },
      ],
    },
    {
      id: 2,
      name: "Chef Emily",
      experience: 8,
      recipes: 40,
      likes: 80,
      image: "https://media.istockphoto.com/id/1299940945/photo/woman-chef-holding-spatula-cooking-equipment.jpg?s=612x612&w=0&k=20&c=BmOEpgaHKlMtJ19Q8pb2e1stMkN-oS4AF6PtuZ2T954=",
      recipesData: [
        { id: 1, name: "Recipe 1", description: "Description 1" },
        { id: 2, name: "Recipe 2", description: "Description 2" },
        { id: 3, name: "Recipe 3", description: "Description 3" },
        { id: 4, name: "Recipe 4", description: "Description 4" },
        { id: 5, name: "Recipe 5", description: "Description 5" },
      ],
    },
    {
      id: 3,
      name: "Chef Michael",
      experience: 12,
      recipes: 60,
      likes: 120,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Iwg0P2XSKGgFg1Q8NN60JS2S7AbXd9wxgV92iuCgEH0uyjerAOhHF0D6oHkehcwCdmc&usqp=CAU",
      recipesData: [
        { id: 1, name: "Recipe 1", description: "Description 1" },
        { id: 2, name: "Recipe 2", description: "Description 2" },
        { id: 3, name: "Recipe 3", description: "Description 3" },
        { id: 4, name: "Recipe 4", description: "Description 4" },
        { id: 5, name: "Recipe 5", description: "Description 5" },
      ],
    },
    {
      id: 4,
      name: "Chef Sarah",
      experience: 6,
      recipes: 30,
      likes: 60,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcDcaNjG4Gl5w62aS131MzRHRQ613vr7iGEQ&usqp=CAU",
      recipesData: [
        { id: 1, name: "Recipe 1", description: "Description 1" },
        { id: 2, name: "Recipe 2", description: "Description 2" },
        { id: 3, name: "Recipe 3", description: "Description 3" },
        { id: 4, name: "Recipe 4", description: "Description 4" },
        { id: 5, name: "Recipe 5", description: "Description 5" },
      ],
    },
    {
      id: 5,
      name: "Chef David",
      experience: 15,
      recipes: 75,
      likes: 150,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwtIclBMKZZWKgBcoHR3m4d3-B2RWRfB43nQ&usqp=CAU",
      recipesData: [
        { id: 1, name: "Recipe 1", description: "Description 1" },
        { id: 2, name: "Recipe 2", description: "Description 2" },
        { id: 3, name: "Recipe 3", description: "Description 3" },
        { id: 4, name: "Recipe 4", description: "Description 4" },
        { id: 5, name: "Recipe 5", description: "Description 5" },
      ],
    },
    {
      id: 6,
      name: "Chef Olivia",
      experience: 9,
      recipes: 45,
      likes: 90,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKTb5PngHQg97OxHNRicXnVQGpUfikBkfcxIHfTDnmP-LolRYj7TNMn2AbKwPXxYPDVQ&usqp=CAU",
      recipesData: [
        { id: 1, name: "Recipe 1", description: "Description 1" },
        { id: 2, name: "Recipe 2", description: "Description 2" },
        { id: 3, name: "Recipe 3", description: "Description 3" },
        { id: 4, name: "Recipe 4", description: "Description 4" },
        { id: 5, name: "Recipe 5", description: "Description 5" },
      ],
    },
    {
      id: 7,
      name: "Chef Zoe",
      experience: 9,
      recipes: 45,
      likes: 90,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFQXzA7EqoezQemcVLEXUAffkE34KIdsnBFA&usqp=CAU",
      recipesData: [
        { id: 1, name: "Recipe 1", description: "Description 1" },
        { id: 2, name: "Recipe 2", description: "Description 2" },
        { id: 3, name: "Recipe 3", description: "Description 3" },
        { id: 4, name: "Recipe 4", description: "Description 4" },
        { id: 5, name: "Recipe 5", description: "Description 5" },
      ],
    },
    {
      id: 8,
      name: "Chef Taylor",
      experience: 9,
      recipes: 45,
      likes: 90,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9M65w_36MfCO6UNrgR2kbmSWrUBa6KxnMw&usqp=CAU",
      recipesData: [
        { id: 1, name: "Recipe 1", description: "Description 1" },
        { id: 2, name: "Recipe 2", description: "Description 2" },
        { id: 3, name: "Recipe 3", description: "Description 3" },
        { id: 4, name: "Recipe 4", description: "Description 4" },
        { id: 5, name: "Recipe 5", description: "Description 5" },
      ],

    },
  ];

  const handleViewRecipes = (chefId) => {
    const selectedChef = chefsData.find(chef => chef.id === chefId);
  
    if (selectedChef) {
      history.push({
        pathname: `/chef/${chefId}/recipes`,
        state: { chef: selectedChef },
      });
    } else {
      console.error(`Chef with id ${chefId} not found`);
    }
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
      </div>
      <FooterBottom />
    </div>
  );
};

export default Home;
