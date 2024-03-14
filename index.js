const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3008;

let lecturers = [
  { id: 1, name: 'Іванов', position: 'Доцент', degree: 'Кандидат наук', room: 101, courses: ['Математика', 'Фізика'] },
  { id: 2, name: 'Петров', position: 'Професор', degree: 'Доктор наук', room: 201, courses: ['Хімія', 'Біологія'] }
];


app.use(bodyParser.json());




app.get('/lecturers', (req, res) => {
    res.json(lecturers);
});


app.get('/lecturers/:id', (req, res) => {
    const lecturer = lecturers.find(l => l.id === parseInt(req.params.id));
    if (!lecturer) {
        res.status(404).json({ error: 'Lecturer not found' });
    } else {
        res.json(lecturer);
    }
});


app.post('/lecturers', (req, res) => {
    const newLecturer = req.body;
    lecturers.push(newLecturer);
    res.status(201).json(newLecturer);
});


app.put('/lecturers/:id', (req, res) => {
    const lecturerId = parseInt(req.params.id);
    const updatedLecturer = req.body;
    lecturers = lecturers.map(lecturer => {
        if (lecturer.id === lecturerId) {
            return { ...lecturer, ...updatedLecturer };
        }
        return lecturer;
    });
    res.json(updatedLecturer);
});


app.delete('/lecturers/:id', (req, res) => {
    const lecturerId = parseInt(req.params.id);
    lecturers = lecturers.filter(lecturer => lecturer.id !== lecturerId);
    
    res.sendStatus(204);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
