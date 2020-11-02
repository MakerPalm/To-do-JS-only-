const SubmitButton = document.getElementById("Submit_Button");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector('.todo-list');

// const cmpBtn = document.querySelector('.complete-btn');
// const trshBtn = document.querySelector('.trash-btn');

SubmitButton.addEventListener('click', function (e) {
    e.preventDefault();


    if (todoInput.value === "") {
        return;
    } else {
        //Create dic
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        //Create complete button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Create Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
        saveLocalTodos(todoInput.value);
        todoInput.value = "";
    }
});

todoList.addEventListener('click', (e) => {
    const item = e.target;
    
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',()=>{
            todo.remove();
        })
    }

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');

    }
});

const filterTodo = document.querySelector('.filter-todo');

filterTodo.addEventListener('click',(e)=>{
    const todos = todoList.childNodes;
    for(let i = 1; i<todos.length;i++){
        switch (e.target.value) {
            case 'all':
                todos[i].style.display="flex"
                console.log(todos[i])
                break;
            case 'completed':
                if(todos[i].classList.contains('completed')){
                    todos[i].style.display="flex";
                } else{
                    todos[i].style.display="none";
                }
                break;
            case 'Uncompleted':
                if(!todos[i].classList.contains('completed')){
                    todos[i].style.display="flex"
                } else {
                    todos[i].style.display="none";
                }
            default:
                break;
        }
    }
    // todos.forEach((todo)=>{
    //     switch (e.target.value) {
    //         case 'all':
    //             todo.style.display="flex"
    //             console.log(todo);
    //             break;
    //         case 'completed':
    //             if(todo.classList.contains('completed')){
    //                 todo.style.display="flex";
    //             } else{
    //                 todo.style.display="none";
    //             }
    //             break;
    //         case 'Uncompleted':
    //             if(!todo.classList.contains('completed')){
    //                 todo.style.display="flex"
    //             } else {
    //                 todo.style.display="none";
    //             }
    //         default:
    //             break;
    //     }
    // })
})

const saveLocalTodos = (item)=>{
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(item);
    localStorage.setItem('todos',JSON.stringify(todos));
}

const getTodos = ()=>{
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((item)=>{
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = item;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        //Create complete button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Create Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    })
}
document.addEventListener('DOMContentLoaded',getTodos());

const removeLocalTodos = (todo)=>{
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    console.log(todos.indexOf(todoIndex));
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}