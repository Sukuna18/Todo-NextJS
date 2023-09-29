import React, { FC, useState, useRef } from "react";
import { Todo, updateTitleById } from "../lib/api";
interface TodoProps {
  id: number;
  title: string;
  completed: boolean;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number, completed: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<any>>;
  todos: Todo[];
}
const Todo: FC<TodoProps> = ({
  completed,
  title,
  id,
  removeTodo,
  toggleTodo,
  setTodos,
  todos,
}) => {
  const editRef = useRef<HTMLInputElement>(null);
  const [edit , setEdit] = useState<boolean>(false);
  async function saveEdit(id: number) {
    if(editRef.current?.value){
      let data = await updateTitleById(id, { title: editRef.current?.value });
      setTodos(todos.map((todo) => (todo.id === data.id ? data : todo)));
    }
    setEdit(false);
  }
  return (
    <div className="flex mb-4 items-center">
      <input
        type="checkbox"
        className="h-6 w-6 text-gray-600 mr-2 peer"
        defaultChecked={completed}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      {edit ? (
        <input
          defaultValue={title}
          ref={editRef}
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-600"
          placeholder="Add Todo"
        />
      ) : (
        <p className="w-full text-grey-darkest peer-checked:line-through peer-checked:text-gray-600">
          {title}
        </p>
      )}

      {edit ? (
        <button
          onClick={() => saveEdit(id)}
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-500 hover:bg-green-600"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setEdit(true)}
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-500 hover:bg-green-600"
        >
          Edit
        </button>
      )}
      {edit ? (
        <button
          onClick={() => setEdit(false)}
          className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-500 hover:text-white hover:bg-red-600"
        >
          Cancel
        </button>
      ) : (
        <button
          onClick={() => removeTodo(id)}
          className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-500 hover:text-white hover:bg-red-600"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default Todo;
