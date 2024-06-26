import React from "react";
import {infoTestTypes, TestsContextProviderProps, TestsContextTypes} from "./types";
import {QuestionsType} from "../components/RenderQuestion/types";
import questionsState from "../assets/questions.json";
import {getTestResult} from "../helpers/getTestResult";

const TestsContext = React.createContext<TestsContextTypes | undefined>(undefined);

export const useTestContext = () => {

    const context = React.useContext(TestsContext);
    if (!context) {
        throw new Error('useTestsContext must be used within a TestsContextProvider');
    }
    return context;
};

export const TestsContextProvider = (props: TestsContextProviderProps) => {

    const {
        children,
    } = props;

    const [historyTests, setHistoryTests] = React.useState<infoTestTypes[]>([]);
    const [newQuestions, setNewQuestions] = React.useState<QuestionsType[]>([]);
    const [allQuestions, setAllQuestions] = React.useState<QuestionsType[]>([]);
    const [questions, setQuestions] = React.useState<QuestionsType[]>([]);
    const [testLast, setTestLast] = React.useState<infoTestTypes | null>(null);
    const [countDoneTests, setCountDoneTests] = React.useState(0);
    const [percentDone, setPercentDone] = React.useState(0);

    React.useEffect(() => {
        let stateQuestions = questionsState as QuestionsType[];
        setQuestions(stateQuestions);
        const newQuestions = localStorage.getItem('newQuestions');
        if (newQuestions) {
            const parseNewQuestions = JSON.parse(newQuestions) as QuestionsType[];
            setNewQuestions(parseNewQuestions);
            setAllQuestions(stateQuestions.concat(parseNewQuestions));
        } else {
            setAllQuestions(stateQuestions);
        }
        const historyTests = localStorage.getItem('history');
        if (historyTests) {
            const parseHistoryTests = JSON.parse(historyTests) as infoTestTypes[];
            setHistoryTests(parseHistoryTests);
        }
    }, []);

    React.useEffect(() => {
        if (historyTests?.length) {
            setTestLast(historyTests[historyTests.length - 1]);
            setCountDoneTests(historyTests[historyTests.length - 1]?.ended ? historyTests.length : historyTests.length - 1);
        }
    }, [historyTests]);

    React.useEffect(() => {
        let sumPercent = 0;
        historyTests.filter(({ended}) => ended).forEach(({data, countQuestions}) => {
            sumPercent += getTestResult(data, allQuestions.slice(0, countQuestions)).percent;
        })
        if (sumPercent)
        setPercentDone(Math.round(sumPercent / countDoneTests));
    }, [testLast])

    return (
        <TestsContext.Provider value={{
            historyTests,
            setHistoryTests,
            testLast,
            countDoneTests,
            questions,
            percentDone,
            newQuestions,
            setNewQuestions,
            allQuestions,
            setAllQuestions
        }}>
            {children}
        </TestsContext.Provider>
    )
}