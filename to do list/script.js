// app.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button class="complete" onclick="toggleComplete(${index})">${task.completed ? 'Uncomplete' : 'Complete'}</button>
            <button class="edit" onclick="editTask(${index})">Edit</button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
        taskList.appendChild(li);
      });
    }
  
    window.toggleComplete = (index) => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
  
    window.editTask = (index) => {
      const newTask = prompt('Edit task:', tasks[index].text);
      if (newTask !== null) {
        tasks[index].text = newTask;
        saveTasks();
        renderTasks();
      }
    };
  
    window.deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
  
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
      }
    });
  
    renderTasks();
  });
  