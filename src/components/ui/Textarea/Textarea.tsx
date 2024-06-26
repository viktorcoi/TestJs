import React from "react";
import {classNames} from "../../../helpers/classNames";
import styles from './Textarea.module.scss';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const Textarea = (props: TextareaProps) => {

    const {
        className,
        readOnly,
        ...restProps
    } = props;

    return (
        <textarea {...restProps}
            readOnly={readOnly}
            className={classNames(
                readOnly && styles.readonly,
                styles.textarea,
                className
            )}
        />
    )
}

export default Textarea;