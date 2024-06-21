import {QuestionsType} from "./types";
import Checked from "../ui/Checked/Checked";
import React from "react";
import Input from "../ui/Input/Input";

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

    const handleChange = (key: number) => {
        if (type === 'simple') {
            setSimple(key);
            onChange(key);
        }
        if (type === "multiple") {
            let multipleUpdate = [...multiple];
            if (multipleUpdate.includes(key)) {
                multipleUpdate = multipleUpdate.filter(item => item !== key);
            } else {
                multipleUpdate.push(key);
            }
            setMultiple(multipleUpdate);
            onChange(multipleUpdate);
        }
    }

    return (
        <div>
            <span>{question}</span>
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
                ) : type === 'value' ? <Input/>

                    : <></>
            }
        </div>
    )
}

export default RenderQuestion;