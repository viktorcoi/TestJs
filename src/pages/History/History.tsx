import React from "react";
import {Link} from "react-router-dom";
import Container from "../../components/ui/Container/Container";
import {useTestContext} from "../../context/TestsContext";
import {classNames} from "../../helpers/classNames";
import {ReactComponent as LogoClear} from "../../assets/img/svg/add.svg";
import styles from './History.module.scss';
import Button from "../../components/ui/Button/Button";
import BlockLink from "../../components/BlockLink/BlockLink";
import {timerTransform} from "../../helpers/timerTransform";
import {getTestResult} from "../../helpers/getTestResult";

const History = () => {

    const {
        allQuestions,
        historyTests,
        countDoneTests,
        percentDone,
        testLast
    } = useTestContext();

    return (
        <Container className={classNames(
            styles.wrapper,
            (!historyTests?.length || !testLast?.ended) && styles.plug
        )}>
            {historyTests?.length && testLast?.ended ?
                <>
                    <span>Тестов завершено: <b>{countDoneTests}</b></span>
                    <span>Средний результат: <b>{percentDone}%</b></span>
                    {historyTests.filter(({ended}) => ended).map(({testId, countQuestions, timer, data}, key) => (
                        <BlockLink key={key} className={styles.main__history} name={`Тест №${testId + 1}`} to={`/history/${testId}`}>
                            <span>Тест пройден за: <b>{timerTransform(((countQuestions * 1.5) * 60) - timer)}</b></span>
                            <span>Результат: <b>{
                                getTestResult(data, allQuestions.slice(0, countQuestions)).success
                            } из {
                                allQuestions.slice(0, countQuestions).length
                            } ({
                                getTestResult(data, allQuestions.slice(0, countQuestions)).percent
                            }%)</b></span>
                        </BlockLink>
                    ))}
                </>
                :
                <>
                    <span className={styles.nothing}><b>Ваша история пуста</b></span>
                    <LogoClear width={65} height={65} className={styles.nothing__icon}/>
                    <Link to={'/test'}>
                        <Button>Пройти тест</Button>
                    </Link>
                </>
            }
        </Container>
    )
}

export default History;