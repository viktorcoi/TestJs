import {arraysEqual, compare} from "./getTestResult";

export const getStatusAnswer = (
    answer: string | number | number[] | null,
    answerSuccess: string | number | number[] | null,
) => {

    if (typeof(answer) === 'number' && typeof(answerSuccess) === 'number') {
        if (answer === answerSuccess) return 'success';
    }
    if (typeof(answer) === 'string' && typeof(answerSuccess) === 'string') {
        if (answer.replace(/\s+/g, '') === answerSuccess.replace(/\s+/g, '')) {
            return 'success';
        }
    }

    if (answerSuccess === null) return 'success';

    if (typeof(answer) === 'object' && answer !== null && typeof(answerSuccess) === 'object') {
        const sortAnswer = answer.sort(compare);
        const sortAnswerSuccess = answerSuccess.sort(compare);
        if (arraysEqual(sortAnswer, sortAnswerSuccess)) return 'success';
    }

    return 'error'
}