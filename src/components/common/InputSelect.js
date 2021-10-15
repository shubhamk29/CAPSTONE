import React from "react";
import {
  InputLabel,
  MenuItem,
  makeStyles,
  Select,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  label: {
    marginBottom: 4,
  },
  inputSelect: {
    marginBottom: 4,
  },
  smallSelectInput: {
    padding: "10.5px 14px",
  },
}));

const InputSelect = (props, ref) => {
  const classes = useStyles();
  const {
    inputLabel,
    variant,
    label,
    id,
    required,
    size,
    register,
    value,
    options,
    optionsKeys,
    dummyOptionLabel,
    onChange,
    error,
    style,
    ...rest
  } = props;

  return (
    <div className={classes.root}>
      {label && (
        <InputLabel shrink className={classes.label}>
          {label}
        </InputLabel>
      )}
      <Select
        className={classes.inputSelect}
        variant={variant ? variant : "outlined"}
        label={inputLabel}
        id={id}
        required={required ? required : false}
        size={size}
        fullWidth
        defaultValue="0"
        {...register}
        ref={ref}
        style={style}
        value={value}
        onChange={onChange}
        {...rest}
        input={<OutlinedInput classes={{ input: classes.smallSelectInput }} />}
      >
        {dummyOptionLabel && (
          <MenuItem value="0">----{dummyOptionLabel}----</MenuItem>
        )}
        {options.map((option, i) => {
          return (
            <MenuItem value={option[optionsKeys[0]]} key={i}>
              {option[optionsKeys[1]]}
            </MenuItem>
          );
        })}
      </Select>
      {error && (
        <FormHelperText style={{ color: "red" }}>
          {error.message}
        </FormHelperText>
      )}
    </div>
  );
};

export default React.forwardRef(InputSelect);
