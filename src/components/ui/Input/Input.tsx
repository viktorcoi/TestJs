import React from "react";
import {classNames} from "../../../helpers/classNames";
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {

    const {
        type = 'text',
        className,
        readOnly,
        ...restProps
    } = props;

    return (
        <input {...restProps}
            readOnly={readOnly}
            className={classNames(
                readOnly && styles.readonly,
                styles.input,
                className
            )}
            type={type}
        />
    )
}

export default Input;