import React from "react";
import { Typography } from "@material-ui/core";

const Title = ({
  variant = "h6",
  mTop,
  mBottom,
  mLeft,
  mRight,
  pTop,
  pBottom,
  pLeft,
  pRight,
  fontSize,
  fontWeight,
  textAlign,
  color,
  children,
  style,
  className,
  ...rest
}) => {
  return (
    <Typography
      {...rest}
      className={className}
      style={{
        marginTop: mTop,
        marginBottom: mBottom,
        marginLeft: mLeft,
        marginRight: mRight,
        paddingTop: pTop,
        paddingBottom: pBottom,
        paddingLeft: pLeft,
        paddingRight: pRight,
        fontSize: fontSize,
        textAlign: textAlign,
        fontWeight: fontWeight,
        color: color,
        ...style,
      }}
      variant={variant}
    >
      {children}
    </Typography>
  );
};

export default Title;
