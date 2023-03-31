let todolist = document.getElementById('todolist');
let saveTodoName = document.getElementById('saveTodoName');
let saveBtn = document.getElementById('saveBtn');



/**
 * GET all todos
 */

function printTodos() {

    fetch('http://localhost:3000/todos')
        .then(res => res.json())
        .then(data => {
            console.log("items", data);


        let ul = document.createElement('ul');

        data.map(todo => {
            let li = document.createElement('li');
            li.innerText = `${todo.todoName}`

            let deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = `<span class="material-symbols-outlined">close</span>`;
            deleteBtn.id = todo.todoId;

            deleteBtn.style.marginLeft = "10px";

            li.addEventListener("click", () => {
                if (li.style.textDecoration === "line-through") {
                    li.style.textDecoration = "none";
                } else {
                    li.style.textDecoration = "line-through";
                }
            });

            deleteBtn.addEventListener("click", () => {
                todoDone(deleteBtn.id)
            });

            ul.appendChild(li);
            li.appendChild(deleteBtn);

        })
        todolist.innerHTML = "";
        todolist.appendChild(ul);
    })
}

/**
 * ADD todo
 */

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
        console.log("create todo", data);
        printTodos(saveTodoName.value);
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
        console.log("change done from 0 to 1", data);
        printTodos(id);
    })
}


printTodos();