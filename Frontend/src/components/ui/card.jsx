import React from "react";

export  default  function Card({ children, className, ...props }) {
  return (
    <div
      className={`rounded-2xl shadow-lg overflow-hidden relative ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
