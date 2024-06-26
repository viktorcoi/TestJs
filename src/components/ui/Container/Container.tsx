import React from "react";
import {classNames} from "../../../helpers/classNames";
import styles from './Container.module.scss';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container = (props: ContainerProps) => {

    const {
        className,
        children,
        ...restProps
    } = props;

    return (
        <div {...restProps} className={classNames(
            styles.container,
            className
        )}>
            {children}
        </div>
    )
}

export default Container;