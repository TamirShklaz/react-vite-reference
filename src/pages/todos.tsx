import { cn } from "@/lib/utils.ts";
import TodoList from "@/components/todos/todo-list.tsx";

type Props = { className?: string };

function Todos({ className }: Props) {
  return (
    <div className={cn(className)}>
      <TodoList/>
    </div>
  );
}

export default Todos;
