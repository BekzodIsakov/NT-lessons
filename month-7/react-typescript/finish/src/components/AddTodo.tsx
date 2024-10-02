import React, { useState } from "react";
import { Plus } from "lucide-react";

import Input from "./Input";
import Button from "./Button";
import { ADD_TODO, useTodo } from "../store/context.tsx";

const AddTodo = () => {
  const { dispatch } = useTodo();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: ADD_TODO, payload: text });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex space-x-2 mb-4'>
      <Input
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        placeholder='Add a new todo'
        className='flex-grow'
      />
      <Button type='submit'>
        <Plus size={16} />
      </Button>
    </form>
  );
};

export default AddTodo;
