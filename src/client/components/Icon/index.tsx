import React from "react";

import pathFixture from "./fixture";

interface IconProps {
  className: string;
  name: "reload" | "pencil-alt" | "trash" | "check" | "x";
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const svgPath = pathFixture[name] ?? pathFixture.reload;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={svgPath}
      />
    </svg>
  );
};

export default Icon;
