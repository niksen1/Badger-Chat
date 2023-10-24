import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import { useNavigate } from 'react-router-dom';

export default function BadgerRegister() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();


    const handleRegister = (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("You must provide both a username and password!");
            return;
        }
        if (password !== checkPassword) {
            alert("Your passwords do not match!");
            return;
        }
        fetch("https://www.cs571.org/api/f23/hw6/register", {
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
                alert("Registration successful!");
                setLoginStatus({ loggedIn: true, username: username });
                sessionStorage.setItem('loginStatus', JSON.stringify({ loggedIn: true, username: username }));
                navigate('/');
                return res.json();
            } else if (res.status === 409) {
                alert("That username has already been taken!");
            }
        });
    };


    return (
        <>
            <h1>Register</h1>
            <Form onSubmit={handleRegister}>
                <Form.Group style={{ marginBottom: "1rem" }}>
                    <Form.Label htmlFor="registerUsername">Username</Form.Label>
                    <Form.Control
                        id="registerUsername"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group style={{ marginBottom: "1rem" }}>
                    <Form.Label htmlFor="registerPassword">Password</Form.Label>
                    <Form.Control
                        id="registerPassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group style={{ marginBottom: "1rem" }}>
                    <Form.Label htmlFor="repeatedPassword">Repeat Password</Form.Label>
                    <Form.Control
                        id="repeatedPassword"
                        type="password"
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </>
    );
}