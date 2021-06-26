import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = () => {
        const call = async (e, p) => {
            const response = await axios.post('http://api.local:9903/login',
                {
                    email: e,
                    password: p
                }
            );
            if(response.data.success === true) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                window.location.reload();
            } else {
                setError(response.data.message)
            }
        }
        call(email, password)
    }

    return (
        <div className="Login">
            <Form>
                <img src="logo.png" className="login-logo" alt=""></img>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Button block size="lg" onClick={handleSubmit} disabled={!validateForm()}>
                    Login
                </Button>
                <p className="text-danger">{error}</p>
            </Form>
        </div>
    );
}
