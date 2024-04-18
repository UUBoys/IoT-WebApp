/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React from "react";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "gray";
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  customBackground?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  size = "md",
  color = "primary",
  onClick,
  disabled,
  isLoading,
  className,
  children,
  customBackground,
  type,
}: ButtonProps) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs font-semibold h-6",
    md: "px-2 py-1 text-sm font-semibold h-8",
    lg: "px-2.5 py-1.5 text-sm font-semibold h-10",
  };

  const colorClasses = {
    primary:
      "bg-primary-400 hover:bg-primary-500 focus-visible:outline-primary-600",
    secondary:
      "bg-secondary-600 hover:bg-secondary-500 focus-visible:outline-secondary-600",
    danger: "!bg-red-600 hover:bg-red-500 focus-visible:outline-red-600",
    success: "bg-green-600 hover:bg-green-500 focus-visible:outline-green-600",
    gray: "bg-gray-400 hover:bg-gray-500 focus-visible:outline-gray-600",
    warning:
      "bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600",
  };

  const sizeClass = sizeClasses[size];
  const colorClass = colorClasses[color];

  const disabledClasses =
    disabled || isLoading
      ? "opacity-50 cursor-not-allowed"
      : "hover:opacity-80 focus-visible:outline-offset-2 focus-visible:outline";

  const loadingClasses = isLoading ? "cursor-wait" : "";

  const buttonClasses = `${
    customBackground || colorClass
  } ${sizeClass} ${disabledClasses} ${loadingClasses} ${className}`;

  return (
    <button
      type={type}
      className={`rounded transition-all ${buttonClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <span className="h-2 w-3 animate-spin rounded-full border-2 border-white transition-all" />
      ) : (
        <span className="text-white  transition-all">{children}</span>
      )}
    </button>
  );
};

export default Button;
