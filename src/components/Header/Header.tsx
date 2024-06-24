import {ReactComponent as Logo}  from '../../assets/img/svg/icon.svg';
import {ReactComponent as Hat}  from '../../assets/img/svg/hat.svg';
import Container from "../ui/Container/Container";
import {Link, useLocation} from "react-router-dom";
import React from "react";
import {useTestContext} from "../../context/TestsContext";
import styles from './Header.module.scss';
import {classNames} from "../../helpers/classNames";

const Header = () => {

    const {
        testLast
    } = useTestContext();

    const {
        pathname
    } = useLocation();

    const [nameTestLink, setNameTestLink] = React.useState('Начать тест');

    React.useEffect(() => {
        if (testLast !== null) {
            if (!testLast.ended) setNameTestLink('Продолжить тест')
            else setNameTestLink('Начать тест')
        }
    }, [testLast]);

    return (
        <header className={styles.header}>
            <Container className={styles.header__wrapper}>
                <Link className={styles.header__main} to={'/'}>
                    <Logo className={styles.header__logo}/>
                    <Hat className={styles.header__hat}/>
                </Link>
                <div className={styles.header__links}>
                    <Link className={classNames(
                        styles.header__link,
                        pathname === '/test' && styles.header__active
                    )} to={'/test'}>{nameTestLink}</Link>
                    <Link className={classNames(
                        styles.header__link,
                        pathname === '/history' && styles.header__active
                    )} to={'/history'}>История</Link>
                    <Link className={classNames(
                        styles.header__link,
                        pathname === '/add' && styles.header__active
                    )} to={'/add'}>Добавить вопрос</Link>
                </div>
            </Container>
        </header>
    )
}

export default Header;