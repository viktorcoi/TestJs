import Container from "../ui/Container/Container";
import React from "react";
import BottomNavigationLink from "../BottomNavigationLink/BottomNavigationLink";
import {useTestContext} from "../../context/TestsContext";
import {ReactComponent as HistoryLogo} from "../../assets/img/svg/history.svg";
import {ReactComponent as TestLogo} from "../../assets/img/svg/test.svg";
import {ReactComponent as AddLogo} from "../../assets/img/svg/add.svg";
import styles from './BottomNavigation.module.scss';

const BottomNavigation = () => {

    const {
        testLast
    } = useTestContext();

    const [nameTestLink, setNameTestLink] = React.useState('Начать тест');

    React.useEffect(() => {
        if (testLast !== null) {
            if (!testLast.ended) setNameTestLink('Продолжить тест')
            else setNameTestLink('Начать тест')
        }
    }, [testLast]);

    return (
        <Container className={styles.navigation}>
            <BottomNavigationLink to={'/history'} icon={<HistoryLogo width={30} height={30}/>}>
                История
            </BottomNavigationLink>
            <BottomNavigationLink to={'/history'} icon={<TestLogo width={30} height={30}/>}>
                {nameTestLink}
            </BottomNavigationLink>
            <BottomNavigationLink to={'/history'} icon={<AddLogo width={30} height={30}/>}>
                Добавить тест
            </BottomNavigationLink>
        </Container>
    )
}

export default BottomNavigation;