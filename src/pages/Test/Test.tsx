import React from "react";
import Container from "../../components/ui/Container/Container";
import StepQuestion from "../../components/StepQuestion/StepQuestion";
import Button from "../../components/ui/Button/Button";
import RenderQuestion from "../../components/RenderQuestion/RenderQuestion";
import {infoTestTypes} from "../../context/types";
import {timerTransform} from "../../helpers/timerTransform";
import {useTestContext} from "../../context/TestsContext";
import {Link, useNavigate} from "react-router-dom";
import {QuestionsType} from "../../components/RenderQuestion/types";
import styles from './Test.module.scss';

const Test = () => {

    const navigate = useNavigate();

    const {
        historyTests,
        setHistoryTests,
        testLast,
        allQuestions,
    } = useTestContext();

    const [currentStep, setCurrentStep] = React.useState(0);
    const [currentAnswer, setCurrentAnswer] = React.useState<string | number | number[]>('');
    const [time, setTime] = React.useState(0);
    const [questionsForTest, setQuestionsForTest] = React.useState<QuestionsType[]>([]);

    const [infoTest, setInfoTest] = React.useState<infoTestTypes>({
        testId: 0,
        currentStep: 0,
        countQuestions: 0,
        ended: false,
        timer: 0,
        data: [],
    });

    React.useEffect(() => {
        let infoTestUpdate: infoTestTypes = {...infoTest};
        if (testLast !== null) {
            if (testLast.ended) {
                infoTestUpdate.countQuestions = allQuestions?.length;
                infoTestUpdate.testId = testLast.testId + 1;
                setQuestionsForTest(allQuestions);
                setTime((allQuestions?.length * 1.5) * 60);
            } else {
                infoTestUpdate.testId = testLast.testId;
                infoTestUpdate.data = testLast.data;
                infoTestUpdate.countQuestions = testLast.countQuestions;
                setTime(testLast.timer);
                setCurrentStep(testLast.currentStep);
                setQuestionsForTest(allQuestions.slice(0, testLast.countQuestions));
            }
        } else {
            infoTestUpdate.countQuestions = allQuestions?.length;
            setTime((allQuestions?.length * 1.5) * 60);
            setQuestionsForTest(allQuestions);
        }
        setInfoTest(infoTestUpdate);
    }, [testLast, allQuestions]);

    React.useEffect(() => {
        const countdown = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearInterval(countdown)
        };
    }, [questionsForTest]);

    const nextQuestion = () => {
        setCurrentStep((prevState) => prevState + 1);
        let infoTestUpdate: infoTestTypes = {...infoTest};
        infoTestUpdate.timer = time;
        infoTestUpdate.currentStep = currentStep + 1;
        infoTestUpdate.data.push(currentAnswer);
        if (currentStep === questionsForTest?.length - 1) {
            infoTestUpdate.ended = true;
        }
        let infoTestForSave: infoTestTypes[] = [...historyTests];
        if (infoTestForSave?.length) {
            if (testLast !== null && testLast.testId === infoTestUpdate.testId) {
                infoTestForSave = infoTestForSave.filter((item) => item.testId !== infoTestUpdate.testId);
                infoTestForSave = [...infoTestForSave, infoTestUpdate];
            } else {
                infoTestForSave = [...infoTestForSave, infoTestUpdate];
            }
        } else {
            infoTestForSave = [infoTestUpdate];
        }
        localStorage.setItem(`history`, JSON.stringify(infoTestForSave));
        setHistoryTests(infoTestForSave);
        setInfoTest(infoTestUpdate);
        setCurrentAnswer('');
        if (currentStep === questionsForTest?.length - 1) {
            navigate(`/history/${infoTestUpdate.testId}`);
        }
    }

    React.useEffect(() => {
        if (time === 0 && currentStep) {
            let infoTestUpdate: infoTestTypes = {...infoTest};
            for (let i = currentStep; i < infoTestUpdate.countQuestions; i++) {
                infoTestUpdate.data.push(null);
            }
        }
    }, [time]);

    if (time === 0) return (
        <Container className={styles.wrapper}>
            <span>Время закончилось</span>
            <Link to={`/history/${infoTest.testId}`}>
                <Button>Перейти к результату теста</Button>
            </Link>
        </Container>
    )

    return (
        <Container className={styles.wrapper}>
            <div className={styles.infoTest}>
                <span>Вопрос {currentStep + 1} из {questionsForTest?.length}</span>
                <span className={styles.timer}>{timerTransform(time)}</span>
            </div>
            <div
                style={{
                    gridTemplateColumns: `repeat(${questionsForTest?.length}, 1fr)`
                }}
                className={styles.steps}
            >
                {questionsForTest.map((item, key) => (
                    <StepQuestion
                        key={key}
                        active={key === currentStep}
                        done={currentStep > key}
                    />
                ))}
            </div>
            {questionsForTest[currentStep]?.type === 'simple' ? <span className={styles.typeQuestion}>Только один вариант ответа*</span>
                : questionsForTest[currentStep]?.type === 'multiple' ? <span className={styles.typeQuestion}>Может быть несколько вариантов ответа*</span>
                : <span className={styles.typeQuestion}>Напишите ответ в поля ввода*</span>
            }
            {questionsForTest.map((question, key) => {
                if (key === currentStep) return (
                    <RenderQuestion onChange={setCurrentAnswer} key={key} question={question}/>
                )
            })}
            <Button
                disabled={
                    currentAnswer === '' ||
                    (typeof(currentAnswer) === 'string' && currentAnswer.trim() === '') ||
                    (typeof(currentAnswer) === 'object' && currentAnswer?.length === 0)
                }
                className={styles.button}
                onClick={nextQuestion}
            >
                {questionsForTest.length - 1 < currentStep + 1 ?  'Закончить тест' : 'Следующий вопрос'}
            </Button>
        </Container>
    )
}

export default Test;