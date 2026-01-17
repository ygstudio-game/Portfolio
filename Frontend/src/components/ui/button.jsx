import React from "react";

export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
