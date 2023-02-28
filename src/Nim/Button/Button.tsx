import { FunctionComponent, HTMLAttributes } from "react";
import classes from "./Button.module.css";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const Button: FunctionComponent<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.button}>
      {children}
    </button>
  );
};

export default Button;
