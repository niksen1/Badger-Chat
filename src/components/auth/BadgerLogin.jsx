import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import { useNavigate } from 'react-router-dom';

export default function BadgerLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ loginStatus, setLoginStatus ] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username || !password) {
          alert("You must provide both a username and password!");
          return;
        }
        fetch("https://www.cs571.org/api/f23/hw6/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "X-CS571-ID": "bid_b17011e15e08e0a932b9fbe1084a58619b81e6dfd03fd7e2ac6bdd8ff6a75367",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          })
        }).then((res) => {
          if (res.status === 200) {
            alert("Login Successful!");
            setLoginStatus({ loggedIn: true, username: username });
            sessionStorage.setItem('loginStatus', JSON.stringify({ loggedIn: true, username: username }));
            navigate('/');
          } else if (res.status === 401) {
            alert("Incorrect username or password!");
            setLoginStatus({ loggedIn: false});
            sessionStorage.removeItem('loginStatus');
          }
        });
      };

    return <>
        <h1>Login</h1>
        <Form onSubmit={handleLogin}>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <Form.Label htmlFor="loginUsername">Username</Form.Label>
          <Form.Control
            id="loginUsername"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <Form.Label htmlFor="loginPassword">Password</Form.Label>
          <Form.Control
            id="loginPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </>
}
