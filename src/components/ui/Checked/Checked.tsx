import React from "react";
import styles from './Checked.module.scss';
import {classNames} from "../../../helpers/classNames";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Checked = (props: RadioProps) => {

    const {
        className,
        children,
        type = 'radio',
        ...restProps
    } = props;

    return (
        <label className={classNames(
            styles.wrapper,
            className
        )}>
            <input {...restProps} type={type} className={styles.input} />
            <div className={styles.checked}/>
            <span>{children}</span>
        </label>
    )
}

export default Checked;