// src/components/CustomButton.tsx
import React, { MouseEvent } from "react";
import { Button } from "antd";

interface CustomButtonProps {
  label?: string;
  onClick: (() => void) | ((event: MouseEvent) => void);
  type?: "primary" | "default" | "dashed" | "link" | "text";
  style?: React.CSSProperties;
  shape?: "default" | "circle" | "round" | undefined,
  icon?: React.ReactElement
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  type = "default",
  style,
  shape,
  icon
}) => {
  return (
    <Button shape={shape} type={type} onClick={onClick} style={style} icon={icon}>
      {label}
    </Button>
  );
};

export default CustomButton;
