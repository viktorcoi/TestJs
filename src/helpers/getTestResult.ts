import {QuestionsType} from "../components/RenderQuestion/types";

export const compare = (a: number, b: number) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

export const arraysEqual = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
}

export const getTestResult = (answers: (string | number | number[] | null)[], questions: QuestionsType[]) => {
    let successAnswers = 0;
    questions.forEach(({answer}, key) => {
        if (typeof(answer) === 'object' && answer !== null && answers[key] !== null) {
            let sortAnswers = answers[key] as number[];
            const sortAnswer = answer.sort(compare);
            sortAnswers = sortAnswers.sort(compare);
            if (arraysEqual(sortAnswer, sortAnswers)) successAnswers++;
        } else if (answer === answers[key] || answer === null) {
            successAnswers++;
        }
    })

    const percent = Math.round((successAnswers / questions.length) * 100);

    return {success: successAnswers, percent: percent}
}