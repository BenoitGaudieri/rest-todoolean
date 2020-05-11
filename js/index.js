$(document).ready(function () {
    // refs
    var newTodoInput = $("#new-todo-input");
    var newTodoBtn = $("#new-todo-btn");
    var todoList = $(".todos");

    // API
    var apiUrl = "http://157.230.17.132:3005/todos";

    // handlebars init
    var source = $("#todo-template").html();
    var template = Handlebars.compile(source);

    /**
     * Logic
     */
    // get all todos
    printAllTodos(apiUrl, template, todoList);

    // create todo
    newTodoBtn.click(() => {
        createTodo(apiUrl, newTodoInput.val(), template, todoList);
    });

    // remove todo
    $(document).on("click", ".remove", function () {
        let todoId = $(this).data("id");
        deleteTodo(apiUrl, template, todoList, todoId);
    });

    //
}); // end Doc ready

/**
 * Functions
 */

//  get all todos (cRud)
function printAllTodos(apiUrl, template, todoList) {
    // reset
    todoList.html("");

    // ajax settings
    let settings = {
        url: apiUrl,
        method: "GET",
    };

    // ajax call and methods
    $.ajax(settings)
        .done((res) => {
            var todos = res;

            for (let i = 0; i < todos.length; i++) {
                const todo = todos[i];

                let context = {
                    todo: todo.text,
                    id: todo.id,
                };

                let html = template(context);
                todoList.append(html);
            }
        })
        .fail((err) => {
            console.log("Error", err);
        });
}

// create new todo (Crud)
function createTodo(apiUrl, input, template, todoList) {
    // ajax settings
    let settings = {
        url: apiUrl,
        method: "POST",
        data: {
            text: input,
        },
    };

    $.ajax(settings)
        .done(() => {
            printAllTodos(apiUrl, template, todoList);
        })
        .fail((err) => {
            console.log("Error", err);
        });
}

// delete todo (cruD)
function deleteTodo(apiUrl, template, todoList, todoId) {
    // ajax settings
    let settings = {
        url: apiUrl + "/" + todoId,
        method: "DELETE",
    };

    $.ajax(settings)
        .done(() => {
            printAllTodos(apiUrl, template, todoList);
        })
        .fail((err) => {
            console.log("Error", err);
        });
}
