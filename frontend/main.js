let todolist = document.getElementById('todolist');
let saveTodoName = document.getElementById('saveTodoName');
let saveBtn = document.getElementById('saveBtn');


fetch('http://localhost:3000/todos')
.then(res => res.json())
.then(data => {
    printTodos(data);
})

function printTodos(todos) {
    todos.map(todo => {
        let li = document.createElement('li');
        li.innerText = `${todo.todoName}`
        li.id = todo.todoId;

        li.addEventListener("click", () => {
            todoDone(li.id);
        })
        
        todolist.appendChild(li);
    })
}


/** ADD TODO into database */
saveBtn.addEventListener("click", () => {

    console.log("click: ", saveTodoName.value);

    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({newToDoName: saveTodoName.value})
    })
    .then(res => res.json())
    .then(data => {
        console.log("skapa item", data);

    })
    
})

/**
 * UPDATE todo to done = 1
 */

function todoDone (id) {
    console.log("spara todo som klar", id)
    

    fetch("http://localhost:3000/done", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({todoId: id})
    })
    .then(res => res.json())
    .then(data => {
        console.log("skapa som klar", data);
    })
}