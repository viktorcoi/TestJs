import React from "react";
import {classNames} from "../../../helpers/classNames";
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => {

    const {
        className,
        children,
        ...restProps
    } = props;

    return (
        <button className={classNames(
            styles.button,
            className
        )} {...restProps}>
            {children}
        </button>
    )
}

export default Button;