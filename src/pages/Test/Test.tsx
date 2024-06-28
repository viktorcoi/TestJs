import React from "react";
import Container from "../../components/ui/Container/Container";
import StepQuestion from "../../components/StepQuestion/StepQuestion";
import Button from "../../components/ui/Button/Button";
import RenderQuestion from "../../components/RenderQuestion/RenderQuestion";
import {infoTestTypes} from "../../context/types";
import {timerTransform} from "../../helpers/timerTransform";
import {useTestContext} from "../../context/TestsContext";
import {Link} from "react-router-dom";
import {QuestionsType} from "../../components/RenderQuestion/types";
import {classNames} from "../../helpers/classNames";
import {ReactComponent as DoneLogo} from "../../assets/img/svg/done.svg";
import {ReactComponent as LogoClear} from "../../assets/img/svg/add.svg";
import styles from './Test.module.scss';

const Test = () => {

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
    const [testEnded, setTestEnded] = React.useState(false);

    const [infoTest, setInfoTest] = React.useState<infoTestTypes>({
        testId: 0,
        currentStep: 0,
        countQuestions: 0,
        ended: false,
        timer: 0,
        data: [],
    });

    React.useEffect(() => {
        if (!testEnded) {
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
        }
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

    const saveTestData = (infoTestUpdate: infoTestTypes) => {
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
    }

    const nextQuestion = () => {
        setCurrentStep((prevState) => prevState + 1);
        let infoTestUpdate: infoTestTypes = {...infoTest};
        infoTestUpdate.timer = time;
        infoTestUpdate.currentStep = currentStep + 1;
        infoTestUpdate.data.push(currentAnswer);
        if (currentStep === questionsForTest?.length - 1) {
            infoTestUpdate.ended = true;
        }
        saveTestData(infoTestUpdate);
        setInfoTest(infoTestUpdate);
        setCurrentAnswer('');
        if (currentStep === questionsForTest?.length - 1) {
            setTestEnded(true);
        }
    }

    React.useEffect(() => {
        if (time === 0 && questionsForTest?.length && currentStep < questionsForTest?.length - 1) {
            let infoTestUpdate: infoTestTypes = {...infoTest};
            infoTestUpdate.ended = true;
            infoTestUpdate.timer = 0;
            for (let i = currentStep; i < infoTestUpdate.countQuestions; i++) {
                infoTestUpdate.data.push(null);
            }
            saveTestData(infoTestUpdate);
            setTestEnded(true);
        }
    }, [time]);

    return (
        <Container className={classNames(
            styles.wrapper,
            testEnded && styles.wrapper__end
        )}>
            {testEnded ?
                <>
                    <span className={styles.end}><b>{(time === 0 && currentStep < questionsForTest?.length - 1) ?
                        'Время закончилось' : 'Вы ответили на все вопросы'
                    }</b></span>
                    {time === 0 && currentStep < questionsForTest?.length - 1 ?
                        <LogoClear width={65} height={65} className={styles.end__icon}/> :
                        <DoneLogo width={65} height={65}/>
                    }
                    <Link to={`/history/${infoTest.testId}`}>
                        <Button>Перейти к результату теста №{infoTest.testId + 1}</Button>
                    </Link>
                </>
                :
                <>
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

                </>

            }
        </Container>
    )
}

export default Test;