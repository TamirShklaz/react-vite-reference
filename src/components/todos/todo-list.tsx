import { cn } from "@/lib/utils.ts";
import useSWR from "swr";
import { fetcher, FetchError } from "@/lib/fetcher.ts";
import { TodoResponse } from "@/types/todo.types.ts";

type Props = { className?: string };

function TodoList({ className }: Props) {

  const { data, isLoading, error } = useSWR<TodoResponse, FetchError>("http://localhost:3000/api/v2/todos", fetcher,
    { shouldRetryOnError: false });

  if (error) {
    console.error(error.message, error.status, error.info);
    return <div>Error fetching todos</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.numTodos === 0) {
    return <div>Empty</div>;
  }

  return (
    <div className={cn(className)}>
      <h1 className={"font-medium text-2xl mb-4"}>Todos</h1>
      {data.todos.map((todo, index) => (
        <div key={index}>{todo.title}</div>
      ))}
    </div>
  );
}

export default TodoList;
