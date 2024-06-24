import React from "react";
import {infoTestTypes, TestsContextProviderProps, TestsContextTypes} from "./types";
import {QuestionsType} from "../components/RenderQuestion/types";
import questionsState from "../assets/questions.json";

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
    const [questions, setQuestions] = React.useState<QuestionsType[]>([]);
    const [testLast, setTestLast] = React.useState<infoTestTypes | null>(null);
    const [countDoneTests, setCountDoneTests] = React.useState(0);
    const [percentDone, setPercent] = React.useState(0);

    React.useEffect(() => {
        let allQuestions = questionsState as QuestionsType[];
        setQuestions(allQuestions);
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
    }, [historyTests])

    return (
        <TestsContext.Provider value={{
            historyTests,
            setHistoryTests,
            testLast,
            countDoneTests,
            questions,
            percentDone,
        }}>
            {children}
        </TestsContext.Provider>
    )
}