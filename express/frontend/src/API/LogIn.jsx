import { Box, Button, Stack, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomInput from "../Components/CustomInput";

export default function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const api_url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const query= {
            username: username,
            password: password
        };
        axios.post(`${api_url}/login`, query)
        .then((response) => {
            if (response.status === 200) {
                setMessage('');
                sessionStorage.setItem('token', JSON.stringify(response.data.token));
                sessionStorage.setItem('user', response.data.user);
                navigate('/');
            } else {
                if (response.message){
                    setMessage(response.message);
                } else {
                    setMessage('Error!');
                }
            }
        })
        .catch((error) => {
            setMessage('Invalid username or password');
        })
    };
    
    return (
        <Container fixed>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                <form onSubmit={handleSubmit} className="form" style={{maxWidth: '600px'}}>
                    <Stack direction={"column"} gap={5}>
                    <Typography variant="h4" color="primary" textAlign={"center"} textTransform={"uppercase"}>Login</Typography>
                        <Stack className="col" direction={'column'} gap={2}>
                            <CustomInput required type="text" name="username" label="Username" var={username} setVar={setUsername} color={"primary"} fullwidth/>
                            <CustomInput required type="password" name="password" label="Password" var={password} setVar={setPassword} color={"primary"} fullwidth/>
                            <Typography color="error" variant="p">{message}</Typography>
                        </Stack>
                        <Stack className="col">
                            <Button variant="contained" color={"primary"} type="submit">
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Container>
    )
}