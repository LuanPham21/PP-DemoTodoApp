import type { Todo, Filter, Priority } from "../types";

export function createTodo(text: string, priority: Priority = "medium"): Todo {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    priority,
    createdAt: new Date(),
  };
}

export function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.completed);
    case "completed":
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
}

export function deleteTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((t) => t.id !== id);
}

export function clearCompleted(todos: Todo[]): Todo[] {
  return todos.filter((t) => !t.completed);
}

export function countActive(todos: Todo[]): number {
  return todos.filter((t) => !t.completed).length;
}

export function sortByPriority(todos: Todo[]): Todo[] {
  const order: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
  return [...todos].sort((a, b) => order[a.priority] - order[b.priority]);
}
