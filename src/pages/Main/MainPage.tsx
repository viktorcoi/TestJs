import Container from "../../components/ui/Container/Container";
import {useTestContext} from "../../context/TestsContext";
import styles from './MainPage.module.scss';
import BlockLink from "../../components/BlockLink/BlockLink";
import React from "react";
import {timerTransform} from "../../helpers/timerTransform";

const MainPage = () => {

    const {
        countDoneTests,
        testLast,
        questions,
        percentDone,
    } = useTestContext();

    const [nameTestLink, setNameTestLink] = React.useState('Начать тест');

    React.useEffect(() => {
        if (testLast !== null) {
            if (!testLast.ended) setNameTestLink('Продолжить тест')
            else setNameTestLink('Начать тест')
        }
    }, [testLast]);

    return (
        <Container className={styles.main}>
            <BlockLink className={styles.main__history} name={'История тестирования'} to={'/history'}>
                <span>Тестов завершено: <b>{countDoneTests}</b></span>
                <span>Средний результат: <b>{percentDone}%</b></span>
            </BlockLink>
            <BlockLink className={styles.main__test} name={nameTestLink} to={'/test'}>
                <span>Текущий вопрос: <b>{testLast?.currentStep && (testLast?.currentStep + 1) || 0}</b> ({
                    questions[testLast?.currentStep && (testLast?.currentStep) || 0]?.question
                })</span>
                <span>Времени осталось: <b>{
                    testLast?.timer && timerTransform(testLast.timer) ||
                    timerTransform((questions?.length * 1.5) * 60)
                }</b></span>
            </BlockLink>
            <BlockLink className={styles.main__add} name={'Добавить вопрос'} to={'/history'}>
                <span>Изначальное кол-во вопросов: <b>{questions?.length}</b></span>
                <span>Вопросов добавлено: <b>{countDoneTests}</b></span>
            </BlockLink>
        </Container>
    )
}

export default MainPage;