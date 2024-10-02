import { useTodo } from "../store/context.tsx";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { state } = useTodo();
  return (
    <div>
      {state.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
