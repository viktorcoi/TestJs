import Container from "../../components/ui/Container/Container";
import {useParams} from "react-router-dom";
import {useTestContext} from "../../context/TestsContext";
import RenderQuestion from "../../components/RenderQuestion/RenderQuestion";
import React from "react";
import styles from './Result.module.scss';
import {getTestResult} from "../../helpers/getTestResult";
import {timerTransform} from "../../helpers/timerTransform";

const Result = () => {

    const {id} = useParams();

    const {
        allQuestions,
        historyTests,
    } = useTestContext();

    if (id === undefined) return <></>

    if (!historyTests[Number(id)]) return <></>

    return (
        <Container className={styles.wrapper}>
            <span>Результаты теста №{Number(id) + 1}</span>
            <span>Отвечено верно: <b>{
                getTestResult(
                    historyTests[Number(id)].data,
                    allQuestions.slice(0, historyTests[Number(id)].countQuestions)
                ).success
            } из {historyTests[Number(id)].countQuestions} ({
                getTestResult(
                    historyTests[Number(id)].data,
                    allQuestions.slice(0, historyTests[Number(id)].countQuestions)
                ).percent
            }%)</b></span>
            <span>Тест пройден за: <b>{
                timerTransform(
                    ((historyTests[Number(id)].countQuestions * 1.5) * 60) - historyTests[Number(id)].timer
                )}</b></span>
            {allQuestions.slice(0, historyTests[Number(id)].countQuestions).map((question, key) => (
                <RenderQuestion
                    key={key}
                    answerTest={historyTests[(Number(id))].data[key]}
                    question={question}
                />
            ))}
        </Container>
    )
}

export default Result;