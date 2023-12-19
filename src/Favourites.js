import React, { useState, useEffect } from 'react';
import TopHeader from './TopHeader'; 
import FooterBottom from './FooterBottom'; 
import ChefCards from './ChefCards'; 
import { Row } from 'antd';
import { useHistory } from 'react-router-dom';

const Favorites = () => {
  const history = useHistory();

  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const [favorites, setFavorites] = useState(storedFavorites);

  const handleViewRecipes = (chefId) => {
    const selectedChef = favorites.find(chef => chef.id === chefId);

    if (selectedChef) {
      history.push({
        pathname: `/chef/${chefId}/recipes`,
        state: { chef: selectedChef },
      });
    } else {
      console.error(`Chef with id ${chefId} not found`);
    }
  };

  const handleAddToFavorites = (chef) => {
    const isFavorite = favorites.some(favChef => favChef.id === chef.id);
  
    if (isFavorite) {
      const updatedFavorites = favorites.filter(favChef => favChef.id !== chef.id);
      setFavorites(updatedFavorites);
  
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, chef];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };
  

  return (
    <div>
      <TopHeader />
      <div>
        <h2>Favorites Page</h2>
        <Row gutter={[16, 16]}>
          <ChefCards
            chefsData={favorites}
            handleViewRecipes={handleViewRecipes}
            handleAddToFavorites={handleAddToFavorites}
            loading={false} 
            favoritesMap={new Map(favorites.map((chef) => [chef.id, chef]))}
          />
        </Row>
      </div>
      <FooterBottom />
    </div>
  );
};

export default Favorites;
