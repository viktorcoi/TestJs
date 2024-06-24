import React from "react";
import {Link} from "react-router-dom";
import {classNames} from "../../helpers/classNames";
import styles from './BlockLink.module.scss';

interface BlockLinkProps extends React.LinkHTMLAttributes<HTMLLinkElement> {
    to: string;
    name?: string;
}

const BlockLink = (props: BlockLinkProps) => {

    const {
        to,
        className,
        children,
        name,
    } = props;

    const elRef = React.useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Проверка на null перед доступом к элементу
        if (elRef.current) {
            const elRect = elRef.current.getBoundingClientRect();
            const posX = e.clientX - elRect.x;
            const posY = e.clientY - elRect.y;
            const ratioX = posX / elRect.width;
            const ratioY = posY / elRect.height;
            elRef.current.style.setProperty('--ratio-x', ratioX.toString());
            elRef.current.style.setProperty('--ratio-y', ratioY.toString());
        }
    }

    return (
        <Link
            ref={elRef}
            to={to}
            onMouseMove={handleMouseMove}
            className={classNames(
                styles.BlockLink,
                className
            )}
        >
            <span className={styles.BlockLink__name}>{name}</span>
            {children}
        </Link>
    )
}

export default BlockLink;