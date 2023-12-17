// SignUp.js
import React, { useCallback, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Form, Input, Button, Typography, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import app from "./base";
import TopHeader from "./TopHeader";
import FooterBottom from "./FooterBottom";

const { Title } = Typography;

const SignUp = ({ history }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleSignUp = useCallback(async (values) => {
    try {
      // Create user with email and password
      const { email, password, name } = values;

      // Upload profile picture if available
      let photoURL = imageUrl;
      if (imageUrl) {
        const storageRef = app.storage().ref(`profile_pictures/${email}`);
        const uploadTask = storageRef.put(imageUrl);
        await uploadTask.on('state_changed', null, null, async () => {
          photoURL = await storageRef.getDownloadURL();
        });
      }

      await app.auth().createUserWithEmailAndPassword(email, password);

      // Get the currently authenticated user
      const user = app.auth().currentUser;

      // Update the user's display name and photo URL
      await user.updateProfile({
        displayName: name,
        photoURL: photoURL,
      });

      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  }, [history, imageUrl]);

  const handleImageChange = info => {
    if (info.file.status === 'done') {
      setImageUrl(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div>
      <TopHeader />
      <div style={{ padding: "20px" }}>
        <Title level={2}>Sign up</Title>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={handleSignUp}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: "Please input a valid email address!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="photo"
            label="Profile Picture"
          >
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false} // Prevent default upload behavior
              onChange={handleImageChange}
            >
              {imageUrl ? <img src={URL.createObjectURL(imageUrl)} alt="avatar" style={{ width: '100%' }} /> : <UploadOutlined />}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
      <FooterBottom />
    </div>
  );
};

export default withRouter(SignUp);
