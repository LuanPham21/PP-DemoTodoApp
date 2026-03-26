import { useState } from "react";
import { useTodos } from "./hooks/useTodos";
import type { Priority, Filter } from "./types";
import "./App.css";

const PRIORITY_COLORS: Record<Priority, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  high: "🔴 High",
  medium: "🟡 Medium",
  low: "🟢 Low",
};

export default function App() {
  const {
    todos,
    filter,
    activeCount,
    hasCompleted,
    addTodo,
    toggle,
    remove,
    clearDone,
    setFilter,
  } = useTodos();
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleAdd = () => {
    if (!input.trim()) return;
    addTodo(input, priority);
    setInput("");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Todo App</h1>
        <p className="subtitle">React + Vite + TypeScript + Vitest</p>
      </header>

      {/* Add Todo */}
      <div className="add-section">
        <input
          className="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="What needs to be done?"
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
        <button className="add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        {(["all", "active", "completed"] as Filter[]).map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.length === 0 && (
          <li className="empty-state">No todos here 🎉</li>
        )}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span
              className="priority-dot"
              style={{ background: PRIORITY_COLORS[todo.priority] }}
              title={PRIORITY_LABELS[todo.priority]}
            />
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggle(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <span
              className="priority-badge"
              style={{ color: PRIORITY_COLORS[todo.priority] }}
            >
              {todo.priority}
            </span>
            <button className="delete-btn" onClick={() => remove(todo.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="footer">
        <span>
          {activeCount} item{activeCount !== 1 ? "s" : ""} left
        </span>
        {hasCompleted && (
          <button className="clear-btn" onClick={clearDone}>
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
