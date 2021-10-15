import React from "react";
import {
  TextField,
  FormHelperText,
  InputLabel,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  label: {
    marginBottom: 4,
  },
  inputField: {
    marginBottom: 4,
  },
}));
const InputField = (props, ref) => {
  const {
    variant,
    type,
    label,
    id,
    inputLabel,
    placeholder,
    accept,
    value,
    size,
    required,
    onChange,
    register,
    error,
    style,
    ...rest
  } = props;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {label && (
        <InputLabel shrink className={classes.label}>
          {label}
        </InputLabel>
      )}
      <TextField
        className={classes.inputField}
        variant={variant ? variant : "outlined"}
        type={type ? type : "text"}
        id={id}
        label={inputLabel}
        placeholder={placeholder}
        accept={accept}
        value={value}
        size={size}
        ref={ref}
        style={style}
        {...register}
        {...rest}
        onChange={onChange}
        fullWidth
        required={required ? required : false}
      />
      {error && (
        <FormHelperText style={{ color: "red" }}>
          {error.message}
        </FormHelperText>
      )}
    </div>
  );
};

const InputFieldForwardRef = React.forwardRef(InputField);
export default InputFieldForwardRef;
