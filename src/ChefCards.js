import React from "react";
import { Card, Button, Avatar, Typography, Row, Col, message } from "antd";
import { HeartFilled, LoadingOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title } = Typography;

const ChefCards = ({ chefsData, handleViewRecipes, handleAddToFavorites, loading, favoritesMap }) => {
  return chefsData.map((chef) => (
    <Col key={chef.id} xs={24} sm={12} md={8} lg={6}>
      <Card
        hoverable
        style={{ margin: 16 }}
        cover={
          <img
            alt={chef.name}
            src={chef.image}
            style={{ height: 200, objectFit: "cover" }}
          />
        }
        actions={[
          <Button
            key="viewRecipes"
            onClick={() => handleViewRecipes(chef.id)}
            disabled={loading}
          >
            View Recipes
          </Button>,
          <Button
            key="addToFavorites"
            onClick={() => handleAddToFavorites(chef)}
            icon={<HeartFilled style={{ color: favoritesMap.has(chef.id) ? 'yellow' : 'inherit' }} />}
            disabled={loading}
          >
            {favoritesMap.has(chef.id) ? "Remove from Fav" : "Add to Favorites"} 
          </Button>,
        ]}
      >
        <Meta
          avatar={<Avatar src={chef.image} />}
          title={chef.name}
          description={`Experience: ${chef.experience} years | Recipes: ${chef.recipes} | Likes: ${chef.likes}`}
        />
      </Card>
    </Col>
  ));
};

export default ChefCards;
