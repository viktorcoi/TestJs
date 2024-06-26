import {QuestionsType} from "./types";
import Checked from "../ui/Checked/Checked";
import React from "react";
import Input from "../ui/Input/Input";
import Textarea from "../ui/Textarea/Textarea";
import {classNames} from "../../helpers/classNames";
import {getStatusAnswer} from "../../helpers/getStatusAnswer";
import styles from './RenderQuestion.module.scss'

interface RenderQuestionProps {
    question: QuestionsType;
    onChange?: (answer: string | number | number[]) => void;
    answerTest?: string | number | number[] | null;
}

const RenderQuestion = (props: RenderQuestionProps) => {

    const {
        answerTest,
        question: dataQuestion,
        onChange = () => {}
    } = props;

    const {
        type,
        question,
        options,
        answer
    } = dataQuestion;

    const [simple, setSimple] = React.useState<null | number>(null);
    const [multiple, setMultiple] = React.useState<number[]>([]);
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        if (answerTest !== undefined) {
            if (type === 'simple' && typeof(answerTest) === 'number')
            setSimple(answerTest);
            if (type === 'multiple' && typeof(answerTest) === 'object' && answerTest !== null)
            setMultiple(answerTest);
            if ((type === 'value' || type === "bigValue") && typeof(answerTest) === 'string')
            setValue(answerTest);
        }
    }, [answerTest])

    const handleChange = (value: number | string) => {
        if (typeof(value) === "number") {
            if (type === 'simple') {
                setSimple(value);
                onChange(value);
            }
            if (type === "multiple") {
                let multipleUpdate = [...multiple];
                if (multipleUpdate.includes(value)) {
                    multipleUpdate = multipleUpdate.filter(item => item !== value);
                } else {
                    multipleUpdate.push(value);
                }
                setMultiple(multipleUpdate);
                onChange(multipleUpdate);
            }
        }
        if (typeof(value) === 'string') {
            setValue(value);
            onChange(value.trim());
        }
    }

    const getAnswersSuccess = () => {
        if (typeof(answer) === 'number' && typeof(options) === 'object' && options !== null) {
            return options[answer]
        }
        if (typeof(answer) === 'string') {
            return answer;
        }
        if (answer !== null && typeof(answer) === 'object' && typeof(options) === 'object' && options !== null) {
            return answer.map(item => options[item]).join(', ');
        }
    }

    return (
        <div className={classNames(
            (answerTest !== undefined && getStatusAnswer(answerTest, answer) === 'error') && styles.questions__error,
            (answerTest !== undefined && getStatusAnswer(answerTest, answer) === 'success') && styles.questions__success,
            styles.questions,
            answerTest !== undefined && styles.questions__answer
        )}>
            <span className={styles.question}>{question}</span>
            {((type === "simple" || type === 'multiple') && options !== null) ?
                options.map((item, key) => (
                        <Checked
                            readOnly={answerTest !== undefined}
                            type={type === 'multiple' ? 'checkbox' : 'radio'}
                            checked={type === 'simple' ? simple === key : type === 'multiple' && multiple.includes(key)}
                            key={key}
                            name={item}
                            onChange={() => handleChange(key)}
                        >
                            {item}
                        </Checked>
                    )
                ) : type === 'value' ?
                    <Input
                        readOnly={answerTest !== undefined}
                        onChange={({target: {value}}) => handleChange(value)}
                        value={value}
                        placeholder={'Напишите ответ'}
                    />
                :  type === 'bigValue' &&
                    <Textarea
                        readOnly={answerTest !== undefined}
                        onChange={({target: {value}}) => handleChange(value)}
                        value={value}
                        placeholder={'Напишите ответ'}
                    />
            }
            {(answerTest !== undefined &&  getStatusAnswer(answerTest, answer) === 'error') &&
                <span className={styles.done}>Правильный ответ: <span className={styles.done__answer}>{getAnswersSuccess()}</span></span>
            }
        </div>
    )
}

export default RenderQuestion;