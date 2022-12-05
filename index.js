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

const elementFactory = (element, parameters) => {
    const el = document.createElement(element);
    if (parameters.className)
        Array.isArray(parameters.className)
            ? parameters.className.forEach(i => el.classList.add(i))
            : el.className = parameters.className;
    if (parameters.dataset)
        el.dataset[parameters.dataset.name] = parameters.dataset.value;
    if (parameters.type)
        el.type = parameters.type;
    if (parameters.id)
        el.id = parameters.id;
    if (parameters.htmlFor)
        el.htmlFor = parameters.htmlFor;
    if (parameters.text)
        el.textContent = parameters.text;
    return el;
}

const createItems = (id, text) => {
    const taskItem = elementFactory("div", {
        className: "task-item",
        dataset: {
            name: "taskId",
            value: id
        }
    });
    const mainContainer = elementFactory("div", {
        className: "task-item__main-container"
    });
    taskItem.append(mainContainer);
    const mainContent = elementFactory("div", {
        className: "task-item__main-content"
    });
    mainContainer.append(mainContent);
    const form = elementFactory("form", {
        className: "task-item__form"
    });
    mainContent.append(form);
    const input = elementFactory("input", {
        className: "checkbox-form__checkbox",
        type: "checkbox",
        id: `task-${id}`
    });
    form.append(input);
    const label = elementFactory("label", {
        htmlFor: `task-${id}`
    });
    form.append(label);
    const span = elementFactory("span", {
        className: "task-item__text",
        text
    });
    mainContent.append(span);
    const button = elementFactory("button", {
        className: ["task-item__delete-button", "default-button", "delete-button"],
        dataset: {
            name: "deleteTaskId",
            value: id
        },
        text: "Удалить"
    });
    mainContainer.append(button);
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
