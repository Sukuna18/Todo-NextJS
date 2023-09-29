"use client";
import { useEffect, useRef, useState } from "react";
import {
  Todo as TodoType,
  addTodo,
  deleteTodoById,
  getTodos,
  updateTitleById,
  updateTodoById,
} from "./lib/api";
import Todo from "./components/Todo";

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onSubmit() {
    if (!title) return;
    let data = await addTodo({ title });
    setTodos([...todos, data]);
    setTitle("");
    if (inputRef.current) inputRef.current.value = "";
  }
  async function removeTodo(id: number) {
    let data = await deleteTodoById(id);
    setTodos(todos.filter((todo) => todo.id !== data.id));
  }
  async function toggleTodo(id: number, completed: boolean) {
    let data = await updateTodoById(id, { completed });
    setTodos(todos.map((todo) => (todo.id === data.id ? data : todo)));
  }

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => setLoading(false));
  }, []);

  return (
    <div className="h-100 w-full flex items-center justify-center font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <div className="flex mt-4">
            <input
              ref={inputRef}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-600"
              placeholder="Add Todo"
            />
            <button
              onClick={onSubmit}
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal-500 hover:text-white hover:bg-teal-600"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          {loading ? (
            <div className="flex items-center justify-center">
              <span className="loading loading-spinner text-error"></span>
            </div>
          ) : (
            <>
              {todos.map((todo) => (
                <Todo
                  key={todo.id}
                  {...todo}
                  removeTodo={removeTodo}
                  toggleTodo={toggleTodo}
                  setTodos={setTodos}
                  todos={todos}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
