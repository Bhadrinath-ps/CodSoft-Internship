// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.innerHTML = ` <span onclick="toggleStrikeout(this)"> ${taskText}</span>
        <button class="edit-button" onclick="editTask(this)"><i class="fas fa-edit"></i></button>
        <button class="delete-button" onclick="deleteTask(this)"><i class="fas fa-trash-alt"></i></button> `;

    taskList.appendChild(li);
    saveTasksToLocalStorage();

    taskInput.value = '';
}

// Function to strikeout a task
function toggleStrikeout(task) {
    task.classList.toggle('strikethrough');
    saveTasksToLocalStorage();
}

// Function to edit a task
function editTask(button) {
    const taskList = document.getElementById('task-list');
    const li = button.parentElement;
    const taskText = li.querySelector('span').textContent;
    const updatedText = prompt('Edit the task:', taskText);

    if (updatedText !== null) {
        li.querySelector('span').textContent = updatedText;
        saveTasksToLocalStorage();
    }
}

// Function to delete a task
function deleteTask(button) {
    const taskList = document.getElementById('task-list');
    const li = button.parentElement;
    taskList.removeChild(li);
    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const taskList = document.getElementById('task-list');
    const tasks = Array.from(taskList.children).map(li => {
        const taskText = li.querySelector('span').textContent;
        const isStrikethrough = li.classList.contains('strikethrough');
        return { text: taskText, strikethrough: isStrikethrough };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(taskData => {
        const li = document.createElement('li');
        li.innerHTML = `<span> ${taskData.text}</span>
            <button class="edit-button" onclick="editTask(this)"><i class="fas fa-edit"></i></button>
            <button class="delete-button" onclick="deleteTask(this)"><i class="fas fa-trash-alt"></i></button `;

        if (taskData.strikethrough) {
            li.classList.add('strikethrough');
        }
        taskList.appendChild(li);

        const taskElement = li.querySelector('span');
        taskElement.addEventListener('click', function () {
            toggleStrikeout(this);
            updateStrikeoutInLocalStorage(taskData.text, !taskData.strikethrough);
        });
    });
}

loadTasksFromLocalStorage();