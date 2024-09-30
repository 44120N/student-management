const { signup, login, create_student, read_students, read_student_nrp, update_student_nrp, delete_student_nrp } = require('./endpoint.js');
const express = require('express');
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
};

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.post('/signup', signup);
app.post('/login', login);

app.post('/students/post', create_student);
app.get('/students', read_students);
app.get('/students/:nrp', read_student_nrp);
app.put('/students/update/:nrp', update_student_nrp);
app.delete('/students/delete/:nrp', delete_student_nrp);
