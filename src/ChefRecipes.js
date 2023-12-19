import React, { useState, useEffect } from "react";
import { Table, Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons"; 
import TopHeader from "./TopHeader";
import { useLocation, useHistory } from "react-router-dom";
import FooterBottom from "./FooterBottom";

const { Title, Paragraph } = Typography;

const ChefRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();
  const { chef } = location.state || {};
  const history = useHistory();

  useEffect(() => {
    const recipesData = chef.recipesData || [];
    setRecipes(recipesData);
  }, [chef.recipesData]);

  const columns = [
    {
      title: "Recipe Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Title level={4}>{text}</Title>,
      style: { fontSize: 20 },
      
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <Paragraph>{text}</Paragraph>,
      style: { fontSize: 20 },
    },
  ];

  const handleBack = () => {
    history.push("/");
  };
  useEffect(() => {
    localStorage.setItem('selectedMenuItem', '1');
  }, []);

  return (
    <div>
      <TopHeader />

      <div style={{ padding: "20px" }}>
        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={handleBack} style={{ marginBottom: "20px" }}>
          Back
        </Button>
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
