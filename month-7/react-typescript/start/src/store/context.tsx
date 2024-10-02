import React, { createContext, useContext, useReducer } from "react";

export interface ToDo {
  id: number;
  text: string;
  completed: boolean;
}

interface State {
  todos: ToDo[];
}

const initialState = {
  todos: [],
};

type ActionType =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | {
      type: "UPDATE_TODO";
      payload: { id: number; text: string };
    }
  | { type: "DELETE_TODO"; payload: number };

interface ContextValueType {
  state: State;
  dispatch: React.Dispatch<ActionType>;
}

const TodoContext = createContext<null | ContextValueType>(null);

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const DELETE_TODO = "DELETE_TODO";

const todoReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

export { useTodo, ADD_TODO, TOGGLE_TODO, UPDATE_TODO, DELETE_TODO };
export default TodoProvider;
