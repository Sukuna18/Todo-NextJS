export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
export async function getTodos():Promise<Todo[]> {
  return await fetch("/api/todos").then((res) => res.json());
}
export async function getTodoById(id: string) {
  return await fetch(`/api/todos/${id}`).then((res) => res.json());
}
export async function addTodo(body: { title: string }) {
  return await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}
export async function updateTodoById(id: number, body: { completed: boolean }) {
  return await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}
export async function deleteTodoById(id: number) {
  return await fetch(`/api/todos/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
}
export async function updateTitleById(id: number, body: { title: string }) {
  return await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}
