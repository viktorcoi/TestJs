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
        <button {...restProps} className={classNames(
            styles.button,
            className
        )}>
            {children}
        </button>
    )
}

export default Button;