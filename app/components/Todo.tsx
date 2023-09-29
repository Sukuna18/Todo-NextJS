import React, { FC } from "react";
interface TodoProps {
  id: number;
  title: string;
  completed: boolean;
  removeTodo: (id: number) => void;
  toggleTodo: (id:number, completed: boolean) => void;
}
const Todo: FC<TodoProps> = ({ completed, title, id, removeTodo, toggleTodo }) => {
  return (
    <div className="flex mb-4 items-center">
      <input type="checkbox" className="h-6 w-6 text-gray-600 mr-2 peer" defaultChecked={completed} onChange={(e) => toggleTodo(id, e.target.checked)} />
      <p className="w-full text-grey-darkest peer-checked:line-through peer-checked:text-gray-600">
        {title}
      </p>
      <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-500 hover:bg-green-600">
        Edit
      </button>
      <button onClick={()=>removeTodo(id)} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-500 hover:text-white hover:bg-red-600">
        Remove
      </button>
    </div>
  );
};

export default Todo;
