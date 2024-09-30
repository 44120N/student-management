require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect()

module.exports = {
    signup: function(req, res){
        console.log(req.body);
        const username = req.body.username;
        const password = req.body.password;
    
        if (username=='' || password=='') {
            return res.status(400).json({ success: false, message: 'Username and password are required' });
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.error('Error generating salt:', err);
                return res.status(500).json({ success: false, message: 'Server error' });
            }

            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return res.status(500).json({ success: false, message: 'Server error' });
                }
                
                console.log("Hashed Password: ", hashedPassword);
                db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashedPassword],
                    (err, result) => {
                        if (err) {
                            console.error('Error database:', err);
                            return res.status(500).json({ success: false, message: 'Server error' });
                        }
                        res.json({ success: true, result: result });
                    }
                );
            });
        });
    },
    
    login: function(req, res){
        const username = req.body.username;
        const password = req.body.password;

        if (username == '' || password == '') {
            return res.status(400).json({ success: false, message: 'Username and password are required' });
        }

        db.query('SELECT password FROM admins WHERE username = ?', [username], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Server error' });
            }

            if (results.length === 0) {
                return res.status(400).json({ success: false, message: 'Invalid username or password' });
            }

            const hashedPassword = results[0].password;

            bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ success: false, message: 'Server error' });
                }

                if (isMatch) {
                    const token = jwt.sign({ id: username }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
                    return res.json({ success: true, token: token, user: username });
                } else {
                    return res.status(400).json({ success: false, message: 'Invalid username or password' });
                }
            });
        });
    },

    create_student: function (req, res){
        const { nrp, name, address, email, birthdate } = req.body;
        const query = `INSERT INTO students (nrp, name, address, email, birthdate) VALUES (?, ?, ?, ?, ?)`;
        db.query(query, [nrp, name, address, email, birthdate], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            res.status(201).json({ success: true, message: 'Student added', studentId: result.insertId });
        });
    },
    read_students: function(req, res){
        db.query('SELECT * FROM students', (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            res.json(results);
        });
    },
    read_student_nrp: function(req, res){
        const { nrp } = req.params;
        db.query('SELECT * FROM students WHERE nrp = ?', [nrp], (err, result) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ success: false, message: 'Student not found' });
            }
            res.json(result[0]);
        });
    },
    update_student_nrp: function(req, res){
        const { nrp } = req.params;
        const { name, address, email, birthdate } = req.body;

        const query = `UPDATE students SET name = ?, address = ?, email = ?, birthdate = ? WHERE nrp = ?`;
        db.query(query, [name, address, email, birthdate, nrp], (err, result) => {
            if (err) {
                console.error('Error updating data:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Student not found' });
            }
            res.status(200).json({ success: true, message: 'Student updated' });
        });
    },
    delete_student_nrp: function(req, res){
        const { nrp } = req.params;
        db.query('DELETE FROM students WHERE nrp = ?', [nrp], (err, result) => {
            if (err) {
                console.error('Error deleting data:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Student not found' });
            }
            res.json({ success: true, message: 'Student deleted' });
        });
    }
}
