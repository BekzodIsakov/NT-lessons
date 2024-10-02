import React from "react";

interface PropTypes {
  type?: React.HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className,
}: PropTypes) => {
  return (
    <input
      type={type}
      className={`w-full px-3 py-2 
        text-gray-700 border rounded-lg focus:outline-none
        focus:border-blue-500 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
