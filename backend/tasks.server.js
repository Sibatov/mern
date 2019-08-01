const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;
let Task = require('./tasks.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/tasks', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

//*  CRUD APP */

// get all tasks
todoRoutes.route('/').get(function(req, res) {
    Task.find(function(err, tasks) {
        if (err) {
            console.log(err);
        } else {
            res.json(tasks);
        }
    });
});
// get task by id
todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Task.findById(id, function(err, todo) {
        res.json(todo);
    });
});
// update task
todoRoutes.route('/updateTask/:id').post(function(req, res) {
    Task.findById(req.params.id, function(err, task) {
        if (!task)
            res.status(404).send("data is not found");
        else
            task.name = req.body.name;
        task.checked = req.body.checked;
        task.save()
            .then( () => {
                res.sendStatus(200);
            })
            .catch( () => {
                res.status(400).send("Update not possible");
            });
    });
});
// delete tasks
todoRoutes.route('/deleteTask/:id').delete( (req, res) => {
    Task.deleteOne({"_id": req.params.id})
        .then( response => {
            res.sendStatus(204).json(response);
        })
        .catch( () => {
            res.sendStatus(404);
        });
});
// add task
todoRoutes.route('/addTask').post(function(req, res) {
    let task = new Task(req.body);
    task.save()
        .then(task => {
            res.status(200).json(task);
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

app.use('/tasks', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
