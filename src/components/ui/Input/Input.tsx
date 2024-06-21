import React from "react";
import {classNames} from "../../../helpers/classNames";
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {

    const {
        type = 'text',
        className
    } = props;

    return (
        <input className={classNames(
            styles.input,
            className
        )} type={type} {...props}/>
    )
}

export default Input;