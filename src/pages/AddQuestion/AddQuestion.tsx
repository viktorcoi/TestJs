import Container from "../../components/ui/Container/Container";
import React from "react";
import Checked from "../../components/ui/Checked/Checked";
import Textarea from "../../components/ui/Textarea/Textarea";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import {answersTypes} from "./types";
import {ReactComponent as AddLogo} from "../../assets/img/svg/add.svg";
import {ReactComponent as DoneLogo} from "../../assets/img/svg/done.svg";
import {useTestContext} from "../../context/TestsContext";
import {QuestionsType} from "../../components/RenderQuestion/types";
import {classNames} from "../../helpers/classNames";
import styles from './AddQuestion.module.scss';

const typesQuestion: {value: "simple" | "multiple" | "value" | "bigValue", text: string}[] = [
    {value: 'simple', text: 'Один ответ'},
    {value: 'multiple', text: 'Множество ответов'},
    {value: 'value', text: 'Поле ввода'},
    {value: 'bigValue', text: 'Большое поле ввода'}
]

const AddQuestion = () => {

    const {
        questions,
        newQuestions,
        setNewQuestions,
        setAllQuestions
    } = useTestContext();

    const [question, setQuestion] = React.useState('');
    const [type, setType] = React.useState<"simple" | "multiple" | "value" | "bigValue">('simple');
    const [answers, setAnswers] = React.useState<answersTypes>({
        currentAnswer: 0,
        answers: [
            {id: 0, text: ''},
            {id: 1, text: ''}
        ]
    });
    const [answerValue, setAnswerValue] = React.useState('');
    const [answerNull, setAnswerNull] = React.useState(false);
    const [disabledButton, setDisabledButton] = React.useState(true);
    const [questionAdded, setQuestionAdded] = React.useState(false);

    React.useEffect(() => {
        if (type === 'simple') {
            setAnswers(prevState => ({
                ...prevState,
                currentAnswer: 0
            }));
        }
        if (type === 'multiple') {
            setAnswers(prevState => ({
                ...prevState,
                currentAnswer: []
            }));
        }
    }, [type]);

    React.useEffect(() => {
        if (type === 'value') {
            if (question !== '' && answerValue !== '') {
                setDisabledButton(false);
            } else setDisabledButton(true);
        }
        if (type === 'bigValue') {
            if ((question !== '' && answerValue !== '') || (question !== '' && answerNull)) {
                setDisabledButton(false);
            } else setDisabledButton(true);
        }
        if (type === 'simple') {
            let allAnswersHas = answers.answers.every(({text}) => text !== '');
            if (question !== '' && allAnswersHas) {
                setDisabledButton(false);
            } else setDisabledButton(true);
        }
        if (type === 'multiple' && typeof(answers.currentAnswer) === 'object') {
            let allAnswersHas = answers.answers.every(({text}) => text !== '');
            if (question !== '' && allAnswersHas && answers.currentAnswer?.length) {
                setDisabledButton(false);
            } else setDisabledButton(true);
        }
    }, [type, question, answers, answerValue, answerNull])

    const handleChangeRadio = (id: number, type: 'multiple' | 'simple') => {
        if (type === 'simple') {
            setAnswers(prevState => ({
                ...prevState,
                currentAnswer: id
            }));
        }
        if (type === 'multiple') {
            let answersUpdate = {...answers};
            if (typeof(answersUpdate.currentAnswer) === 'object') {
                if (answersUpdate.currentAnswer.includes(id)) {
                    answersUpdate.currentAnswer = answersUpdate.currentAnswer.filter(item => item !== id);
                } else {
                    answersUpdate.currentAnswer.push(id);
                }
                setAnswers(answersUpdate);
            }
        }
    }

    const handleChangeValueChecked = (id: number, value: string) => {
        setAnswers(prevState => ({
            ...prevState,
            answers: prevState.answers.map(answer =>
                answer.id === id ? {...answer, text: value} : answer
            )
        }))
    }

    const handleAddAnswerChecked = () => {
        let answersUpdate = {...answers};
        const nextIdAnswer = answersUpdate.answers[answersUpdate.answers.length - 1].id + 1;
        answersUpdate.answers.push({
            id: nextIdAnswer,
            text: ''
        })
        setAnswers(answersUpdate);
    }

    const handleRemoveAnswerChecked = (id: number) => {
        let answersUpdate = {...answers};
        answersUpdate.answers = answersUpdate.answers.filter((item) => item.id !== id);
        if (answersUpdate.currentAnswer === id) {
            answersUpdate.currentAnswer = 0;
        }
        setAnswers(answersUpdate);
    }

    const handleAddQuestion = () => {
        if (!questionAdded) {
            const newQuestion: QuestionsType = {
                type: type,
                question: question,
                options: type === 'simple' || type === 'multiple' ? answers.answers.map(({text}) => (
                    text
                )) : null,
                answer: type === 'simple' || type === 'multiple' ? answers.currentAnswer : answerNull ? null : answerValue
            }
            if (newQuestions) {
                localStorage.setItem('newQuestions', JSON.stringify([...newQuestions, newQuestion]));
                setNewQuestions([...newQuestions, newQuestion]);
                setAllQuestions(questions.concat([...newQuestions, newQuestion]));
            } else {
                localStorage.setItem('newQuestions', JSON.stringify([newQuestion]));
                setNewQuestions([newQuestion]);
                setAllQuestions(questions.concat([newQuestion]));
            }
            setQuestionAdded(true);
        } else {
            setQuestion('');
            setType('simple');
            setAnswers({
                currentAnswer: 0,
                answers: [
                    {id: 0, text: ''},
                    {id: 1, text: ''}
                ]
            });
            setAnswerValue('');
            setAnswerNull(false);
            setDisabledButton(true);
            setQuestionAdded(false);
        }
    }

    return (
        <Container className={classNames(
            styles.wrapper,
            questionAdded && styles.added
        )}>
            {!questionAdded ?
                <>
                    <div className={styles.block}>
                        <span><b>Введите вопрос:</b></span>
                        <Textarea
                            className={styles.textarea}
                            value={question}
                            onChange={({target: {value}}) => setQuestion(value)}
                            placeholder={'Введите вопрос'}
                        />
                    </div>
                    <div className={styles.block}>
                        <span><b>Выберите тип ответа:</b></span>
                        {typesQuestion.map(({value, text}, key) => (
                            <Checked
                                checked={value === type}
                                key={key}
                                name={'type'}
                                onChange={() => setType(value)}
                            >
                                {text}
                            </Checked>
                        ))}
                    </div>
                    {type === 'value' ?
                        <div className={styles.block}>
                            <span><b>Введите ответ в поле: </b></span>
                            <Input
                                value={answerValue}
                                onChange={({target: {value}}) => setAnswerValue(value)}
                                placeholder={'Введите ответ'}
                            />
                        </div>
                    : type === 'bigValue' ?
                        <div className={styles.block}>
                            <span><b>Введите ответ в поле: </b></span>
                            <Textarea
                                value={answerValue}
                                onChange={({target: {value}}) => setAnswerValue(value)}
                                placeholder={'Введите ответ'}
                            />
                            <Checked
                                checked={answerNull}
                                onChange={({target: {checked}}) => setAnswerNull(checked)}
                                type={'checkbox'}
                            >
                                Ответ не влияет на оценку
                            </Checked>
                        </div>
                    : (type === 'simple' || type === 'multiple') &&
                        <div className={styles.block}>
                            <span><b>Добавьте и отметьте правильный ответ:</b></span>
                            {answers?.answers.map(({text, id}, key) => (
                                <div key={key} className={styles.answer}>
                                    <Checked
                                        type={type === 'multiple' ? "checkbox" : 'radio'}
                                        checked={(type === 'simple' && typeof(answers.currentAnswer) === "number") ?
                                            answers.currentAnswer === id :
                                            (type === 'multiple' && typeof(answers.currentAnswer) === 'object') &&
                                            answers.currentAnswer.includes(id)
                                        }
                                        name={'answer'}
                                        onChange={() => handleChangeRadio(id, type)}
                                    >
                                        <Input
                                            value={text}
                                            onChange={({target: {value}}) => handleChangeValueChecked(id, value)}
                                        />
                                    </Checked>
                                    {id < 2 ? <></> :
                                        <button
                                            className={styles.answer__button}
                                            onClick={() => handleRemoveAnswerChecked(id)}
                                        >
                                            <AddLogo className={styles.answer__remove} width={24} height={24}/>
                                        </button>
                                    }
                                </div>
                            ))}
                            <button
                                className={styles.add}
                                onClick={handleAddAnswerChecked}
                            >
                                + Добавить ответ
                            </button>
                        </div>
                    }
                </>
                :
                <>
                    <span className={styles.success}><b>Вопрос успешно добавлен</b></span>
                    <DoneLogo width={65} height={65}/>
                </>
            }
            <Button
                onClick={handleAddQuestion}
                disabled={disabledButton}
                className={styles.button}
            >
                {questionAdded ? 'Добавить новый вопрос' : 'Добавить вопрос'}
            </Button>
        </Container>
    )
}

export default AddQuestion;