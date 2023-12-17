// AntDesignFooter.js
import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  GithubOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;
const { Text, Link } = Typography;

const FooterBottom = () => {
  return (
    <Footer style={{ background: '#001529', color: '#fff', padding: '40px 0', textAlign: 'center' }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong style={{ fontSize: '16px', color: '#fff' }}>Contact Us</Text>
          <Divider style={{ borderColor: '#fff' }} />
          <Space direction="vertical" size={8}>
            <Text style={{ color: '#ccc' }}>
              <PhoneOutlined /> Phone: +1 (555) 123-4567
            </Text>
            <Text style={{ color: '#ccc' }}>
              <MailOutlined /> Email: info@yourcompany.com
            </Text>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong style={{ fontSize: '16px', color: '#fff' }}>Quick Links</Text>
          <Divider style={{ borderColor: '#fff' }} />
          <Space direction="vertical" size={8}>
            <Link href="#" style={{ color: '#ccc' }}>
              Home
            </Link>
            <Link href="#" style={{ color: '#ccc' }}>
              About Us
            </Link>
            <Link href="#" style={{ color: '#ccc' }}>
              Services
            </Link>
            <Link href="#" style={{ color: '#ccc' }}>
              Contact
            </Link>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text strong style={{ fontSize: '16px', color: '#fff' }}>Connect With Us</Text>
          <Divider style={{ borderColor: '#fff' }} />
          <Space size="large">
            <Link href="#" target="_blank" style={{ color: '#ccc' }}>
              <GithubOutlined />
            </Link>
            <Link href="#" target="_blank" style={{ color: '#ccc' }}>
              <TwitterOutlined />
            </Link>
            <Link href="#" target="_blank" style={{ color: '#ccc' }}>
              <InstagramOutlined />
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider style={{ borderColor: '#fff' }} />
      <Text style={{ color: '#ccc' }}>
        Your Copyright © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
      </Text>
    </Footer>
  );
};

export default FooterBottom;
