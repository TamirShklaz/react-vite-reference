import { cn } from "@/lib/utils.ts";
import { TodoResponse } from "@/types/todo.types.ts";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/fetcher.ts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";

type Props = { className?: string };

function TodoList({ className }: Props) {

  const {
    data,
    error,
    isLoading,
    size,
    setSize
  } = useSWRInfinite<TodoResponse>((index, previousPageData: TodoResponse) => {
    if (previousPageData && !previousPageData.next) return null;
    let reqSting = `http://localhost:3000/api/v2/todos`;
    if (index > 0) reqSting += `?cursor=${previousPageData.nextCursor}`;
    return reqSting;
  }, fetcher);

  const todos = data ? data.flatMap((page) => page?.todos) : [];
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = todos.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.todos.length < 20);

  const { ref, inView } = useInView({
    threshold: 0.4
  });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  const loadMore = () => {
    setSize((size) => size + 1);
  };


  if (error) {
    console.error(error.message, error.status, error.info);
    return <div>Error fetching todos</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!todos || todos.length === 0) {
    return <div>Empty</div>;
  }

  return (
    <div className={cn(className)}>
      <h1 className={"font-medium text-2xl mb-4"}>Todos</h1>
      {todos.map((todo, index) => (
        <div key={index}>{todo.title}</div>
      ))}
      <div>
        {!isReachingEnd && (
          <>
            {isLoadingMore && <span>Loading more...</span>}
            <Button onClick={loadMore} disabled={isLoadingMore} ref={ref}>Load more</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoList;
