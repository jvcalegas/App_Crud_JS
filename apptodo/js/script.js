let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("Falhou!");
        msg.innerHTML = "Campo obrigatório!";
    } else {
        console.log("Sucesso!");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "modal");
        })();

    }

};

let data = [];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
};

let createTasks = () => {
    tasks.innerHTML = "";

    console.log("Passei aqui!");

    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
                <i onClick="editTask(this)"
                class="fas fa-edit"
                data-bs-toggle="model"
                data-bs-target="#form"></i>
                <i onClick="deleteTask(this);createTasks()"
                class="fas fa-trash-alt"></i>
            </span>
        </div>
        `);
    });

    resetform();
};
let resetform = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    deleteTask(e);
    
    let myModal = new bootstrap.Modal(document.getElementById('form'), {});
    myModal.show();
    
};