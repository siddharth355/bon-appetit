import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, HeartOutlined, SettingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Header, Content } = Layout;

const TopHeader = () => {
  const history = useHistory();
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    const storedMenuItem = localStorage.getItem('selectedMenuItem');
    if (storedMenuItem) {
      setSelectedMenuItem(storedMenuItem);
    }
  }, []);

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
    navigateToPage(e.key);

    // Save selected menu item to local storage
    localStorage.setItem('selectedMenuItem', e.key);
  };

  const navigateToPage = (key) => {
    switch (key) {
      case '1':
        history.push('/');
        break;
      case '2':
        history.push('/about');
        break;
      case '4':
        history.push('/favorites');
        break;
      case '3':
        history.push('/settings');
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <Header style={{ background: '#001529', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: 'white', fontSize: '24px' }}>Bon Appétit</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedMenuItem]}
          onClick={(e) => handleMenuClick(e)}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            About
          </Menu.Item>
          <Menu.Item key="4" icon={<HeartOutlined />}>
            Favorites
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default TopHeader;
