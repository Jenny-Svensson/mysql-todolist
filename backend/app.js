var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mysql = require('mysql2');
const cors = require('cors');

var app = express();

const connection = 
app.locals.con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "todolist",
    password: "todolist",
    database: "todolist"
});

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/** TODOS ***/
app.get('/todos', function(req,res,next) {
    connection.connect(function(err) {
        if (err) {
            console.log(err)
        }

        let sql = `SELECT * FROM todos WHERE done = 0`;

        connection.query(sql, function(err,result) {
            if (err) {
                console.log(err)
            }

            console.log("result", result)
            res.json(result);
        })
    })
})

app.post('/todos', function(req,res,next) {
    let newTodo = req.body;

    connection.connect(function(err) {
        if (err) {
            console.log(err)
        }

        let sql = "INSERT INTO todos (todoName) VALUES ('"+newTodo.newToDoName+"')";

        connection.query(sql, function(err,result) {
            if (err) {
                console.log(err)
            }

            console.log("result", result)
            res.json(result);
        })
    })
})

app.post('/done', function(req,res,next) {
    let todoDone = req.body.todoId;

    connection.connect(function(err) {
        if (err) {
            console.log(err)
        }

        let sql = "UPDATE todos SET done = 1 WHERE todoId = " + todoDone;

        connection.query(sql, function(err,result) {
            if (err) {
                console.log(err)
            }

            console.log("result", result)
            res.json(result);
        })
    })
})





module.exports = app;
