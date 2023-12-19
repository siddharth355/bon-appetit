import React, { useContext, useState, useEffect } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import { Form, Input, Button, Typography, Modal } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import TopHeader from "./TopHeader.js";
import FooterBottom from "./FooterBottom.js";
import { AuthContext } from "./Auth.js";
import { signInWithEmailAndPassword, getAuth, signInWithPopup} from 'firebase/auth';
import {githubProvider, googleProvider} from "./base.js"
import { auth } from './base'; 


const { Title } = Typography;

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem('selectedMenuItem', '1');
  }, []);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const onFinish = async (values) => {
    const { email, password } = values;

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      setErrorModalVisible(true);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/");
    } catch (error) {
      setErrorMessage("Invalid Credentials");
      setErrorModalVisible(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      history.push("/");
    } catch (error) {
      setErrorMessage(error.message);
      setErrorModalVisible(true);
    }
  };
  
  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      history.push("/");
    } catch (error) {
      setErrorMessage(error.message);
      setErrorModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setErrorModalVisible(false);
  };

   
  

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopHeader />
      <div style={{ padding: "20px", flex: 1 }}>
        <div style={{ maxWidth: "400px", margin: "auto", background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <Title level={2} style={{ textAlign: "center" }}>Log in</Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Log in
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type="primary" icon={<GoogleOutlined />} onClick={handleGoogleLogin} style={{ width: "100%" }}>
              Log in with Google
            </Button>
            <Button type="default" icon={<GithubOutlined />} onClick={handleGithubLogin} style={{ width: "100%", marginTop: '10px' }}>
              Log in with GitHub
            </Button>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <FooterBottom />

      <Modal
        title="Error"
        visible={errorModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalClose}>
            OK
          </Button>,
        ]}
      >
        <p>{errorMessage}</p>
      </Modal>
    </div>
  );
};

export default withRouter(Login);
