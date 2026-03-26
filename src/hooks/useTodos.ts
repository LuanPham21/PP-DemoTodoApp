import { useState } from "react";
import type { Todo, Filter, Priority } from "../types";
import {
  createTodo,
  filterTodos,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  countActive,
  sortByPriority,
} from "../utils/todoUtils";

const INITIAL_TODOS: Todo[] = [
  {
    id: "1",
    text: "Setup Vitest for unit testing",
    completed: true,
    priority: "high",
    createdAt: new Date(),
  },
  {
    id: "2",
    text: "Configure GitHub Actions CI/CD pipeline",
    completed: false,
    priority: "high",
    createdAt: new Date(),
  },
  {
    id: "3",
    text: "Write unit tests for utility functions",
    completed: false,
    priority: "medium",
    createdAt: new Date(),
  },
  {
    id: "4",
    text: "Deploy to Vercel",
    completed: false,
    priority: "low",
    createdAt: new Date(),
  },
];

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = (text: string, priority: Priority) => {
    if (!text.trim()) return;
    setTodos((prev) => [createTodo(text, priority), ...prev]);
  };

  const toggle = (id: string) => {
    setTodos((prev) => toggleTodo(prev, id));
  };

  const remove = (id: string) => {
    setTodos((prev) => deleteTodo(prev, id));
  };

  const clearDone = () => {
    setTodos((prev) => clearCompleted(prev));
  };

  const filteredTodos = sortByPriority(filterTodos(todos, filter));
  const activeCount = countActive(todos);
  const hasCompleted = todos.some((t) => t.completed);

  return {
    todos: filteredTodos,
    filter,
    activeCount,
    hasCompleted,
    addTodo,
    toggle,
    remove,
    clearDone,
    setFilter,
  };
}
