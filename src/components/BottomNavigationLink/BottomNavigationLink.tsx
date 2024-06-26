import React from "react";
import {Link} from "react-router-dom";
import {classNames} from "../../helpers/classNames";
import styles from './BottomNavigationLink.module.scss';

interface BottomNavigationLinkProps extends React.LinkHTMLAttributes<HTMLLinkElement> {
    to: string;
    icon: React.ReactNode;
    active?: boolean;
}


const BottomNavigationLink = (props: BottomNavigationLinkProps) => {

    const {
        to,
        children,
        icon,
        active = false
    } = props;

    return (
        <Link className={styles.link} to={to}>
            <div className={classNames(
                styles.icon,
                active && styles.active
            )}>
                {icon}
            </div>
            <span className={classNames(
                styles.text,
                active && styles.active
            )}>
                {children}
            </span>
        </Link>
    )
}

export default BottomNavigationLink;