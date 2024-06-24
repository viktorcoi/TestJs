import {QuestionsType} from "./types";
import Checked from "../ui/Checked/Checked";
import React from "react";
import Input from "../ui/Input/Input";
import styles from './RenderQuestion.module.scss'
import Textarea from "../ui/Textarea/Textarea";

interface RenderQuestionProps {
    question: QuestionsType;
    onChange?: (answer: string | number | number[]) => void;
}

const RenderQuestion = (props: RenderQuestionProps) => {

    const {
        question: dataQuestion,
        onChange = () => {}
    } = props;

    const {
        type,
        question,
        options,
        answer,
    } = dataQuestion;

    const [simple, setSimple] = React.useState<null | number>(null);
    const [multiple, setMultiple] = React.useState<number[]>([]);
    const [value, setValue] = React.useState('');

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

    return (
        <div className={styles.questions}>
            <span className={styles.question}>{question}</span>
            {(type === "simple" || type === 'multiple') ?
                options.map((item, key) => (
                        <Checked
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
                        onChange={({target: {value}}) => handleChange(value)}
                        value={value}
                        placeholder={'Напишите ответ'}
                    />
                :  type === 'bigValue' &&
                    <Textarea
                        onChange={({target: {value}}) => handleChange(value)}
                        value={value}
                        placeholder={'Напишите ответ'}
                    />
            }
        </div>
    )
}

export default RenderQuestion;