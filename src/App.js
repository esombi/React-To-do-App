import { useState } from "react";

const taskArray = [
  { text: "Book ticket" },
  { text: "Pay for Hotel" },
  { text: "Pack bag" },
];

export default function App() {
  const [tasks, setTasks] = useState(taskArray);

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, { text: task, completed: false }]);
  }

  function handleEditTask(index, newTask) {
    const updatedTask = [...tasks];
    updatedTask[index].text = newTask;

    setTasks(updatedTask);
  }

  function handleRemoveTask(index) {
    const task = [...tasks];
    task.splice(index, 1);
    setTasks(task);
  }
  function handleCompleteTask(index) {
    const task = [...tasks];
    task[index].completed = !task[index].completed;
    setTasks(task);
  }

  return (
    <div className="App">
      <h1>Sheddy's To-Do List</h1>
      <TaskForm onAddTask={handleAddTask} />
      <Tasklists
        tasks={tasks}
        onEditTask={handleEditTask}
        onRemoveTask={handleRemoveTask}
        onCompleteTask={handleCompleteTask}
      />
    </div>
  );
}

function TaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState("");
  function handleClick() {
    const addedTask = newTask.trim();
    if (addedTask === "") return;
    onAddTask(addedTask);
    setNewTask("");
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Enter a new Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleClick}>Add Task</button>
    </div>
  );
}

function Tasklists({ tasks, onEditTask, onRemoveTask, onCompleteTask }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} className={task.completed ? "completed" : ""}>
          {task.text}
          <button
            onClick={() => onEditTask(index, prompt("Edit task:", task.text))}
          >
            Edit
          </button>
          <button onClick={() => onRemoveTask(index)}>Remove</button>
          <button onClick={() => onCompleteTask(index)}>
            {task.completed ? "Undo Complete" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}
