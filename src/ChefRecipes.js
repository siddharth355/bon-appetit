import React, { useState, useEffect } from "react";
import { Table, Tag, Typography } from "antd";
import TopHeader from "./TopHeader";
import { useLocation } from "react-router-dom";
import FooterBottom from "./FooterBottom";

const { Title, Paragraph } = Typography;

const ChefRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();
  const { chef } = location.state || {};

  useEffect(() => {
    // Assuming you have a JSON data structure for recipes
    const sampleRecipesData = [
      { id: 1, chefId: 1, name: "Recipe 1", description: "Description 1" },
      { id: 2, chefId: 1, name: "Recipe 2", description: "Description 2" },
      // Add more recipes as needed
    ];
  
    // Simulate fetching recipes based on the chef's ID
    const fetchedRecipes = sampleRecipesData.filter((recipe) => recipe.chefId === chef.id);
    setRecipes(fetchedRecipes);
  }, [chef.id]);

  const columns = [
    {
      title: "Recipe Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Title level={4}>{text}</Title>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <Paragraph>{text}</Paragraph>,
    },
  ];

  return (
    <div>
      <TopHeader />

      <div style={{ padding: "20px" }}>
        <div style={{ textAlign: "center" }}>
          <img src={chef.image} alt={chef.name} style={{ maxWidth: "100%", borderRadius: "8px" }} />
          <Title level={2}>{chef.name}</Title>
          <Paragraph>{chef.bio}</Paragraph>
          <Paragraph>Likes: {chef.likes}</Paragraph>
          <Paragraph>Recipes: {chef.recipes}</Paragraph>
          <Paragraph>Experience: {chef.experience} years</Paragraph>
        </div>

        <Title level={3} style={{ marginTop: "20px" }}>Recipes by {chef.name}</Title>
        <Table dataSource={recipes} columns={columns} pagination={false} />
      </div>

      <FooterBottom />
    </div>
  );
};

export default ChefRecipes;
