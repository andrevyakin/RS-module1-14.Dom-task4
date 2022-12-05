const tasks = [
    {
        id: "1138465078061",
        completed: false,
        text: "Посмотреть новый урок по JavaScript",
    },
    {
        id: "1138465078062",
        completed: false,
        text: "Выполнить тест после урока",
    },
    {
        id: "1138465078063",
        completed: false,
        text: "Выполнить ДЗ после урока",
    },
];

const createItems = (id, text) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.taskId = id;
    const mainContainer = document.createElement("div");
    mainContainer.className = "task-item__main-container";
    const mainContent = document.createElement("div");
    mainContent.className = "task-item__main-content";
    const form = document.createElement("form");
    form.className = "task-item__form";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "checkbox-form";
    input.id = `task-${id}`;
    const label = document.createElement("label");
    label.htmlFor = `task-${id}`;
    form.append(input);
    form.append(label);
    const span = document.createElement("span");
    span.className = "task-item__text";
    span.textContent = text;
    mainContent.append(form);
    mainContent.append(span);
    const button = document.createElement("button");
    button.classList.add("task-item__delete-button", "default-button", "delete-button");
    button.dataset.deleteTaskId = id;
    button.textContent = "Удалить";
    mainContainer.append(mainContent);
    mainContainer.append(button);
    taskItem.append(mainContainer);
    return taskItem;
}

const tasksList = document.querySelector(".tasks-list");
const addItems = () => {
    tasks.forEach(task => tasksList.append(createItems(task.id, task.text)));
}
addItems();

const createTaskBlock = document.querySelector(".create-task-block");
const spanError = document.createElement("span");

const validations = text => {
    document.querySelector(".error-message-block")
        ? spanError.remove()
        : spanError.className = "error-message-block";
    if (!text || tasks.some(i => i.text === text)) {
        !text
            ? spanError.textContent = "Название задачи не должно быть пустым."
            : spanError.textContent = "Задача с таким названием уже существует."
        createTaskBlock.prepend(spanError);
        return false;
    }
    return true;
}

createTaskBlock.addEventListener("submit", (event) => {
    event.preventDefault();
    const textToAdd = event.target.taskName.value
    if (validations(textToAdd)) {
        tasks.unshift({id: `${Date.now()}`, completed: false, text: textToAdd});
        tasksList.prepend(createItems(tasks[0].id, textToAdd));
    }
})
