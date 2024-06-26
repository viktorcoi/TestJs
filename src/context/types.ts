import React from "react";
import {QuestionsType} from "../components/RenderQuestion/types";

export interface infoTestTypes {
    testId: number;
    countQuestions: number;
    timer: number;
    currentStep: number;
    ended: boolean;
    data: (string | number | number[] | null)[];
}

export interface TestsContextTypes extends Omit<TestsContextProviderProps, 'children'> {
    historyTests: infoTestTypes[];
    setHistoryTests: React.Dispatch<React.SetStateAction<infoTestTypes[]>>;
    testLast: infoTestTypes | null;
    countDoneTests: number;
    questions: QuestionsType[];
    percentDone: number;
    newQuestions: QuestionsType[];
    setNewQuestions: React.Dispatch<React.SetStateAction<QuestionsType[]>>;
    allQuestions: QuestionsType[];
    setAllQuestions: React.Dispatch<React.SetStateAction<QuestionsType[]>>;
}

export interface TestsContextProviderProps {
    children: React.ReactNode;
}