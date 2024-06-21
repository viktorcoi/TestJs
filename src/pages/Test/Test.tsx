import React from "react";
import questionsState from '../../assets/questions.json';
import Container from "../../components/ui/Container/Container";
import StepQuestion from "../../components/StepQuestion/StepQuestion";
import Button from "../../components/ui/Button/Button";
import RenderQuestion from "../../components/RenderQuestion/RenderQuestion";
import {QuestionsType} from "../../components/RenderQuestion/types";
import styles from './Test.module.scss';
import stepQuestion from "../../components/StepQuestion/StepQuestion";
const Test = () => {

    const [currentStep, setCurrentStep] = React.useState(0);
    const [questions, setQuestions] = React.useState<QuestionsType[]>([]);
    const [currentAnswer, setCurrentAnswer] = React.useState<string | number | number[]>('');

    React.useEffect(() => {
        setQuestions(questionsState as QuestionsType[]);
    }, []);

    return (
        <Container>
            <div
                style={{
                    gridTemplateColumns: `repeat(${questions?.length}, 1fr)`
                }}
                className={styles.steps}
            >
                {questions.map((item, key) => (
                    <StepQuestion
                        key={key}
                        active={key === currentStep}
                        done={currentStep > key}
                    />
                ))}
            </div>
            {questions[currentStep]?.type === 'simple' ? <span>Только один вариант ответа</span>
                : questions[currentStep]?.type === 'multiple' ? <span>Может быть несколько вариантов ответа</span>
                : <span>Напишите ответ в поля ввода</span>
            }
            {questions.map((question, key) => {
                if (key === currentStep) return (
                    <RenderQuestion onChange={setCurrentAnswer} key={key} question={question}/>
                )
            })}
            <Button
                onClick={() => setCurrentStep((prevState) => prevState + 1)}
            >
                {questions.length - 1 < currentStep + 1 ?  'edn' : 'next'}
            </Button>
        </Container>
    )
}

export default Test;