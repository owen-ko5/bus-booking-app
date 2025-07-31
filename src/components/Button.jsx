import React from "react";

export default function Button({
  text,
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition
        disabled:bg-blue-300 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children || text}
    </button>
  );
}