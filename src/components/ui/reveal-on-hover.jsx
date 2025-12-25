'use client'

import * as React from "react";
import { cn } from "../../lib/utils";

// Context for hover state
const CardHoverRevealContext = React.createContext(null);

const useCardHoverRevealContext = () => {
  const context = React.useContext(CardHoverRevealContext);
  if (!context) {
    throw new Error(
      "useCardHoverRevealContext must be used within a CardHoverRevealProvider"
    );
  }
  return context;
};

// Main wrapper component
const CardHoverReveal = React.forwardRef(({ className, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <CardHoverRevealContext.Provider value={{ isHovered, setIsHovered }}>
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    </CardHoverRevealContext.Provider>
  );
});
CardHoverReveal.displayName = "CardHoverReveal";

// Main content that scales on hover
const CardHoverRevealMain = React.forwardRef(
  ({ className, initialScale = 1, hoverScale = 1.05, ...props }, ref) => {
    const { isHovered } = useCardHoverRevealContext();
    return (
      <div
        ref={ref}
        className={cn("size-full transition-transform duration-300", className)}
        style={
          isHovered
            ? { transform: `scale(${hoverScale})`, ...props.style }
            : { transform: `scale(${initialScale})`, ...props.style }
        }
        {...props}
      />
    );
  }
);
CardHoverRevealMain.displayName = "CardHoverRevealMain";

// Content overlay that reveals on hover
const CardHoverRevealContent = React.forwardRef(({ className, ...props }, ref) => {
  const { isHovered } = useCardHoverRevealContext();
  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-[auto_1.5rem_1.5rem] p-6 backdrop-blur-lg transition-all duration-500 ease-in-out",
        className
      )}
      style={
        isHovered
          ? { transform: "translateY(0%)", opacity: 1, ...props.style }
          : { transform: "translateY(120%)", opacity: 0, ...props.style }
      }
      {...props}
    />
  );
});
CardHoverRevealContent.displayName = "CardHoverRevealContent";

export { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent };
