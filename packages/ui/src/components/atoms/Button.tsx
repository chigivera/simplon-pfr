// src/components/CustomButton.tsx
import React from "react";
import { Button } from "antd";

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  type?: "primary" | "default" | "dashed" | "link" | "text";
  style?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  type = "default",
  style,
}) => {
  return (
    <Button type={type} onClick={onClick} style={style} >
      {label}
    </Button>
  );
};

export default CustomButton;
