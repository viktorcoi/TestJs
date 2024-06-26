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
        allQuestions,
        percentDone,
        newQuestions,
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
                {testLast && !testLast?.ended ?
                    <>
                        <span>Текущий вопрос: <b>{testLast?.currentStep + 1}</b> ({allQuestions[testLast?.currentStep]?.question})</span>
                        <span>Времени осталось: <b>{timerTransform(testLast.timer)}</b></span>
                    </>
                    :
                    <>
                        <span>Текущий вопрос: <b>0</b> ({allQuestions[0]?.question})</span>
                        <span>Времени осталось: <b>{timerTransform((allQuestions?.length * 1.5) * 60)}</b></span>
                    </>
                }
            </BlockLink>
            <BlockLink className={styles.main__add} name={'Добавить вопрос'} to={'/add'}>
                <span>Изначальное кол-во вопросов: <b>{allQuestions?.length}</b></span>
                <span>Вопросов добавлено: <b>{newQuestions?.length}</b></span>
            </BlockLink>
        </Container>
    )
}

export default MainPage;