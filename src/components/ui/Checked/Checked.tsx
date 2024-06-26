import React from "react";
import styles from './Checked.module.scss';
import {classNames} from "../../../helpers/classNames";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Checked = (props: RadioProps) => {

    const {
        readOnly,
        className,
        children,
        type = 'radio',
        ...restProps
    } = props;

    return (
        <label className={classNames(
            styles.wrapper,
            readOnly && styles.readonly,
            className
        )}>
            <input {...restProps} type={type} className={styles.input} />
            <div className={classNames(
                styles.checked,
                type === 'radio' && styles.checked__radio,
                type === 'checkbox' && styles.checked__checkbox
            )}/>
            <span>{children}</span>
        </label>
    )
}

export default Checked;