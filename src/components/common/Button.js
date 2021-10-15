import React from "react";
import { Button } from "@material-ui/core";
const InputButton = (props) => {
  const {
    variant,
    color,
    type,
    fullWidth,
    size,
    mTop,
    mBottom,
    mLeft,
    mRight,
    style,
    onClick,
    Icon,
    children,
    ...rest
  } = props;
  return (
    <Button
      type={type ? type : "button"}
      variant={variant ? variant : "contained"}
      color={color ? color : "primary"}
      fullWidth={fullWidth ? true : false}
      size={size ? size : "small"}
      style={{
        marginTop: mTop,
        marginBottom: mBottom,
        marginLeft: mLeft,
        marginRight: mRight,
        ...style,
      }}
      {...rest}
      onClick={onClick}
      startIcon={Icon && <Icon />}
    >
      {children}
    </Button>
  );
};

export default InputButton;
