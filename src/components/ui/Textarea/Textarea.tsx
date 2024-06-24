import React from "react";
import styles from './Textarea.module.scss';
import {classNames} from "../../../helpers/classNames";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const Textarea = (props: TextareaProps) => {

    const {
        className
    } = props;

    return (
        <textarea className={classNames(
            styles.textarea,
            className
        )} {...props}/>
    )
}

export default Textarea;