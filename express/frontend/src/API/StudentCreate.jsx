import { Box, Button, Stack, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginRequired from "../Components/LoginRequired";
import axios from "axios";
import CustomInput from "../Components/CustomInput";
import Popup from "../Components/Popup";

export default function StudentCreate() {
    const [nrp, setNrp] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');

    const [message, setMessage] = useState('');
    const api_url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const query= {
            nrp: nrp,
            name: name,
            address: address,
            email: email,
            birthdate: birth
        };
        axios.post(`${api_url}/students/post`, query)
        .then((response) => {
            if (response.status === 201) {
                setMessage('');
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
            setMessage('Invalid data');
        })
    };
    
    return (
        <LoginRequired>
            <Container fixed>
                <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                    <form onSubmit={handleSubmit} className="form" style={{maxWidth: '600px'}}>
                        <Stack direction={"column"} gap={5}>
                        <Typography variant="h4" color="primary" textAlign={"center"} textTransform={"uppercase"}>Add Student</Typography>
                            <Stack className="col" direction={'column'} gap={2}>
                                <CustomInput required type="text" name="nrp" label="NRP" var={nrp} setVar={setNrp} color={"primary"} fullwidth/>
                                <CustomInput required type="text" name="name" label="Name" var={name} setVar={setName} color={"primary"} fullwidth/>
                                <CustomInput type="text" name="address" label="Address" var={address} setVar={setAddress} color={"primary"} fullwidth/>
                                <CustomInput required type="email" name="email" label="Email" var={email} setVar={setEmail} color={"primary"} fullwidth/>
                                <CustomInput type="date" name="birth" label="Birthdate" var={birth} setVar={setBirth} color={"primary"} fullwidth focused/>
                                <Typography color="error" variant="p">{message}</Typography>
                            </Stack>
                            <Stack className="col" direction={"row"} gap={4} justifyContent={'space-evenly'}>
                                <Button variant="contained" color={"primary"} type="submit">
                                    Submit
                                </Button>
                                <Button variant="contained" color={"error"} href="/">
                                    Cancel
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Container>
        </LoginRequired>
    )
}