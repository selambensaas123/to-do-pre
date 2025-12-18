let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

const loadTasks = () => {
    const storedTasks = localStorage.getItem('todoItems');
    
    if (storedTasks) {
        return JSON.parse(storedTasks);
    } else {
        saveTasks(items);
        return items;
    }
};

const createItem = (item) => {
    const template = document.getElementById("to-do__item-template");
    const cloneElement = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = cloneElement.querySelector(".to-do__item-text");
    const deleteButton = cloneElement.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = cloneElement.querySelector(".to-do__item-button_type_duplicate");
    const editButton = cloneElement.querySelector(".to-do__item-button_type_edit");

    textElement.textContent = item;

    deleteButton.addEventListener('click', () => {
        cloneElement.remove();
        const currentTasks = getTasksFromDOM();
        saveTasks(currentTasks);
    });

    duplicateButton.addEventListener('click', () => {
        const itemName = textElement.textContent;
        const copyItem = createItem(itemName);
        listElement.prepend(copyItem);
        const currentTasks = getTasksFromDOM();
        saveTasks(currentTasks);
    });

    editButton.addEventListener('click', () => {
        textElement.setAttribute('contenteditable', 'true');
        textElement.focus();
    });

    textElement.addEventListener('blur', () => {
        textElement.setAttribute('contenteditable', 'false');
        const currentTasks = getTasksFromDOM();
        saveTasks(currentTasks);
    });

    return cloneElement;
};

const getTasksFromDOM = () => {
    const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
    const tasks = [];
    
    itemsNamesElements.forEach((element) => {
        tasks.push(element.textContent);
    });
    
    return tasks;
};

const saveTasks = (tasks) => {
    localStorage.setItem('todoItems', JSON.stringify(tasks));
};

items = loadTasks();

items.forEach((item) => {
    const taskElement = createItem(item);
    listElement.append(taskElement);
});

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskText = inputElement.value.trim();

    if (taskText) {
        const taskElement = createItem(taskText);
        listElement.prepend(taskElement);
        
        items = getTasksFromDOM();
        saveTasks(items);
        
        inputElement.value = '';
    }
});