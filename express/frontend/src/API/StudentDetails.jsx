import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Stack, Typography, Button, Paper } from '@mui/material';
import axios from 'axios';
import CustomInput from '../Components/CustomInput';
import LoginRequired from '../Components/LoginRequired';
import Popup from '../Components/Popup';

export default function StudentDetails() {
    const { nrp } = useParams();
    const navigate = useNavigate();
    const api_url = import.meta.env.VITE_API_URL;
    
    const [studentNrp, setStudentNrp] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');

    const [popup, setPopup] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`${api_url}/students/${nrp}`)
        .then(response => {
            setStudentNrp(response.data.nrp);
            setName(response.data.name);
            setAddress(response.data.address);
            setEmail(response.data.email);
            setBirth(response.data.birthdate);
        })
        .catch(error => {
            console.error('Failed to fetch student details', error);
            setMessage('Failed to fetch student details');
        });
    }, [nrp]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const student = {
            nrp: studentNrp,
            name: name,
            address: address,
            email: email,
            birthdate: birth,
        }
        axios.put(`${api_url}/students/update/${nrp}`, student)
        .then(response => {
            if (response.status === 200) {
                setMessage('');
                navigate('/')
            } else {
                setMessage('Failed to update student details');
            }
        })
        .catch(error => {
            console.error('Failed to update student details', error);
            setMessage('Failed to update student details');
        });
    };

    const handleDelete = () => {
        axios.delete(`${api_url}/students/delete/${nrp}`)
        .then(response => {
            if (response.status === 200) {
                navigate('/');
            } else {
                setMessage('Failed to delete student');
            }
        })
        .catch(error => {
            console.error('Failed to delete student', error);
            setMessage('Failed to delete student');
        });
    };

    return (
        <LoginRequired>
            <Container fixed>
                <Popup trigger={popup} setTrigger={setPopup} title={"WARNING"}>
                    <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} gap={2}>
                        "Are you sure you want to Delete this data"
                        <Stack direction={"row"} justifyContent={"space-evenly"} gap={4}>
                            <Button variant={'contained'} color={'primary'} onClick={handleDelete}>Yes</Button>
                            <Button variant={'contained'} color={'error'} onClick={()=>{setPopup(false)}}>No</Button>
                        </Stack>
                    </Stack>
                </Popup>
                <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                    <form onSubmit={handleUpdate} className="form" style={{maxWidth: '600px'}}>
                        <Stack direction={"column"} gap={5}>
                            <Typography variant="h4" color="primary" textAlign={"center"} textTransform={"uppercase"}>Student Details</Typography>
                            <Stack direction={'column'} gap={2}>
                                <CustomInput
                                    required
                                    type="text"
                                    name="nrp"
                                    label="NRP"
                                    var={studentNrp}
                                    setVar={setStudentNrp}
                                    color={"primary"}
                                    fullwidth
                                    disabled
                                />
                                <CustomInput
                                    required
                                    type="text"
                                    name="name"
                                    label="Name"
                                    var={name}
                                    setVar={setName}
                                    color={"primary"}
                                    fullwidth
                                />
                                <CustomInput
                                    type="text"
                                    name="address"
                                    label="Address"
                                    var={address}
                                    setVar={setAddress}
                                    color={"primary"}
                                    fullwidth
                                />
                                <CustomInput
                                    required
                                    type="email"
                                    name="email"
                                    label="Email"
                                    var={email}
                                    setVar={setEmail}
                                    color={"primary"}
                                    fullwidth
                                />
                                <CustomInput
                                    type="date"
                                    name="birthdate"
                                    label="Birthdate"
                                    var={birth}
                                    setVar={setBirth}
                                    color={"primary"}
                                    fullwidth
                                    focused
                                />
                                <Typography color="error" variant="p">{message}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-evenly">
                                <Button variant="contained" color={"primary"} type="submit">
                                    Save
                                </Button>
                                <Button variant="contained" color={"error"} onClick={()=>{setPopup(true)}}>
                                    Delete
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Container>
        </LoginRequired>
    );
}
