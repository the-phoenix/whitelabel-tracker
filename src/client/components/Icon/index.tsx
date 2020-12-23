import React from "react";

interface IconProps {
  name: "delete" | "clear";
}

const Icon: React.FC<IconProps> = ({ name }) => {
  return <span className="material-icons">{name}</span>;
};

export default Icon;
