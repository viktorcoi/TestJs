import React from "react";
import {Link} from "react-router-dom";
import styles from './BottomNavigationLink.module.scss';

interface BottomNavigationLinkProps extends React.LinkHTMLAttributes<HTMLLinkElement> {
    to: string;
    icon: React.ReactNode;
}


const BottomNavigationLink = (props: BottomNavigationLinkProps) => {

    const {
        to,
        children,
        icon,
    } = props;

    return (
        <Link className={styles.link} to={to}>
            <div className={styles.icon}>{icon}</div>
            <span className={styles.text}>{children}</span>
        </Link>
    )
}

export default BottomNavigationLink;