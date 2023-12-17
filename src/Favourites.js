import React, { useState, useEffect } from 'react';
import TopHeader from './TopHeader'; // Import your existing TopHeader component
import FooterBottom from './FooterBottom'; // Import your existing FooterBottom component
import ChefCards from './ChefCards'; // Import the ChefCards component
import { Row } from 'antd';

const Favorites = () => {
  // Fetch favorites from local storage
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const [favorites, setFavorites] = useState(storedFavorites);

  // Define functions to handle view recipes and add/remove from favorites
  const handleViewRecipes = (chefId) => {
    // Handle the view recipes action
    console.log(`View recipes for chef ${chefId}`);
  };

  const handleAddToFavorites = (chef) => {
    // Handle the add/remove from favorites action
    console.log(`Add/Remove chef ${chef.name} to/from favorites`);
  };

  return (
    <div>
      <TopHeader />
      <div>
        <h2>Favorites Page</h2>
        <Row gutter={[16, 16]}>
          {/* Use ChefCards component to display favorite chefs */}
          <ChefCards
            chefsData={favorites}
            handleViewRecipes={handleViewRecipes}
            handleAddToFavorites={handleAddToFavorites}
            loading={false} // Set loading as needed
            favoritesMap={new Map(favorites.map((chef) => [chef.id, chef]))}
          />
        </Row>
      </div>
      <FooterBottom />
    </div>
  );
};

export default Favorites;
