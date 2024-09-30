import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function StudentTable() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const api_url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${api_url}/students`)
        .then((response) => {
            setStudents(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Failed to fetch student data', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <Stack alignItems="center" justifyContent="center" height="100vh">
                <CircularProgress />
            </Stack>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="students table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">NRP</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Birthdate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {students.map((student) => (
                    <TableRow key={student.nrp}>
                        <TableCell align="center"><Link to={`/student/${student.nrp}`}>{student.nrp}</Link></TableCell>
                        <TableCell align="center">{student.name}</TableCell>
                        <TableCell align="center">{student.address}</TableCell>
                        <TableCell align="center">{student.email}</TableCell>
                        <TableCell align="center">{student.birthdate}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default StudentTable;
