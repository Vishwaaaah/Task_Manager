require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use('/tasks', taskRouter);
app.use('/users', userRouter);

// Database connection
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Welcome to Task Manager!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

