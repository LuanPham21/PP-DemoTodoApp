import { describe, it, expect, beforeEach } from "vitest";
import {
  createTodo,
  filterTodos,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  countActive,
  sortByPriority,
} from "../utils/todoUtils";
import type { Todo } from "../types";

// ────────────────────────────────────────────────────────────
// Test fixtures
// ────────────────────────────────────────────────────────────
const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: "1",
  text: "Test todo",
  completed: false,
  priority: "medium",
  createdAt: new Date(),
  ...overrides,
});

let todos: Todo[];

beforeEach(() => {
  todos = [
    makeTodo({ id: "1", text: "Buy milk", completed: false, priority: "low" }),
    makeTodo({ id: "2", text: "Go to gym", completed: true, priority: "high" }),
    makeTodo({
      id: "3",
      text: "Read book",
      completed: false,
      priority: "medium",
    }),
  ];
});

// ────────────────────────────────────────────────────────────
// createTodo
// ────────────────────────────────────────────────────────────
describe("createTodo", () => {
  it("should create a todo with the given text", () => {
    const todo = createTodo("Hello world");
    expect(todo.text).toBe("Hello world");
  });

  it("should trim whitespace from text", () => {
    const todo = createTodo("  Hello world  ");
    expect(todo.text).toBe("Hello world");
  });

  it("should default priority to medium", () => {
    const todo = createTodo("Test");
    expect(todo.priority).toBe("medium");
  });

  it("should accept custom priority", () => {
    const todo = createTodo("Urgent task", "high");
    expect(todo.priority).toBe("high");
  });

  it("should create todo with completed = false", () => {
    const todo = createTodo("New task");
    expect(todo.completed).toBe(false);
  });

  it("should generate a unique id", () => {
    const a = createTodo("Task A");
    const b = createTodo("Task B");
    expect(a.id).not.toBe(b.id);
  });
});

// ────────────────────────────────────────────────────────────
// filterTodos
// ────────────────────────────────────────────────────────────
describe("filterTodos", () => {
  it('should return all todos when filter is "all"', () => {
    expect(filterTodos(todos, "all")).toHaveLength(3);
  });

  it('should return only active todos when filter is "active"', () => {
    const result = filterTodos(todos, "active");
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  it('should return only completed todos when filter is "completed"', () => {
    const result = filterTodos(todos, "completed");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("should return empty array when no todos match filter", () => {
    const allDone = todos.map((t) => ({ ...t, completed: true }));
    expect(filterTodos(allDone, "active")).toHaveLength(0);
  });
});

// ────────────────────────────────────────────────────────────
// toggleTodo
// ────────────────────────────────────────────────────────────
describe("toggleTodo", () => {
  it("should mark an active todo as completed", () => {
    const result = toggleTodo(todos, "1");
    expect(result.find((t) => t.id === "1")?.completed).toBe(true);
  });

  it("should mark a completed todo as active", () => {
    const result = toggleTodo(todos, "2");
    expect(result.find((t) => t.id === "2")?.completed).toBe(false);
  });

  it("should not mutate other todos", () => {
    const result = toggleTodo(todos, "1");
    expect(result.find((t) => t.id === "3")?.completed).toBe(false);
  });

  it("should not mutate original array", () => {
    toggleTodo(todos, "1");
    expect(todos[0].completed).toBe(false);
  });
});

// ────────────────────────────────────────────────────────────
// deleteTodo
// ────────────────────────────────────────────────────────────
describe("deleteTodo", () => {
  it("should remove the todo with given id", () => {
    const result = deleteTodo(todos, "1");
    expect(result.find((t) => t.id === "1")).toBeUndefined();
  });

  it("should reduce array length by 1", () => {
    expect(deleteTodo(todos, "1")).toHaveLength(2);
  });

  it("should keep other todos intact", () => {
    const result = deleteTodo(todos, "1");
    expect(result.map((t) => t.id)).toEqual(["2", "3"]);
  });
});

// ────────────────────────────────────────────────────────────
// clearCompleted
// ────────────────────────────────────────────────────────────
describe("clearCompleted", () => {
  it("should remove all completed todos", () => {
    const result = clearCompleted(todos);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  it("should keep active todos", () => {
    expect(clearCompleted(todos)).toHaveLength(2);
  });

  it("should return same array if nothing is completed", () => {
    const allActive = todos.map((t) => ({ ...t, completed: false }));
    expect(clearCompleted(allActive)).toHaveLength(3);
  });
});

// ────────────────────────────────────────────────────────────
// countActive
// ────────────────────────────────────────────────────────────
describe("countActive", () => {
  it("should count only non-completed todos", () => {
    expect(countActive(todos)).toBe(2);
  });

  it("should return 0 when all completed", () => {
    const allDone = todos.map((t) => ({ ...t, completed: true }));
    expect(countActive(allDone)).toBe(0);
  });

  it("should return full length when none completed", () => {
    const allActive = todos.map((t) => ({ ...t, completed: false }));
    expect(countActive(allActive)).toBe(3);
  });
});

// ────────────────────────────────────────────────────────────
// sortByPriority
// ────────────────────────────────────────────────────────────
describe("sortByPriority", () => {
  it("should sort high before medium before low", () => {
    const sorted = sortByPriority(todos);
    expect(sorted.map((t) => t.priority)).toEqual(["high", "medium", "low"]);
  });

  it("should not mutate the original array", () => {
    sortByPriority(todos);
    expect(todos[0].priority).toBe("low");
  });
});
