import { useState } from "react";
import icon from "./imgs/icons8-clear-50.png";

export default function App() {
  const [todos, setTodos] = useState([]);

  function handleAddTasks(todo) {
    setTodos((todos) => [...todos, todo]);
  }
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items ?"
    );
    if (confirmed) setTodos([]);
  }
  function handleOnDeleteTodo(id) {
    setTodos((todos) => todos.filter((todos) => todos.id !== id));
  }
  console.log(todos);
  return (
    <div className="app">
      <div className="container">
        <Header />
        <div className="todo-container">
          <Form onAddTasks={handleAddTasks} />
          <List
            todos={todos}
            onClearList={handleClearList}
            onDeleteTodo={handleOnDeleteTodo}
          />
        </div>
      </div>
    </div>
  );
}
function Header() {
  return <h1>ToDo`s</h1>;
}

function Form({ onAddTasks }) {
  const [task, setTask] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!task) return;

    const newTask = { task, id: Date.now() };
    console.log(newTask);
    onAddTasks(newTask);
    setTask("");
  }

  return (
    <form className="form-flex" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your task.."
        className="form-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      ></input>
      <button className="btn">Add Task</button>
    </form>
  );
}

function List({ todos, onClearList, onDeleteTodo }) {
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <ListItem
            todo={todo}
            key={todo.id}
            onClearList={onClearList}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </ul>

      <div className="actions">
        {todos.length > 0 && (
          <button className="btn clear" onClick={onClearList}>
            Clear List
          </button>
        )}
      </div>
    </>
  );
}

function ListItem({ todo, onDeleteTodo }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {todo.task}
      {isHovered && (
        <img
          src={icon}
          alt="Icon"
          className="delete-icon"
          onClick={() => onDeleteTodo(todo.id)}
        />
      )}
    </li>
  );
}
