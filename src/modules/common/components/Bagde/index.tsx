import clsx from "clsx";
import React from "react";

type BadgeProps = {
  type: "success" | "warning" | "error";
  children: string;
  onClick?: () => void;
};

const Badge: React.FC<BadgeProps> = ({
  type = "success",
  children,
  onClick,
}: BadgeProps) => {
  const styles: { [K in BadgeProps["type"]]: string } = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  const cln = clsx(
    "rounded-lg px-2 py-1 text-xs font-semibold text-white",
    styles[type as BadgeProps["type"]]
  );

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <div className={cln} onClick={handleClick}>
      <p>{children}</p>
    </div>
  );
};

export default Badge;
