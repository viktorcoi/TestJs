import React from "react";
import {QuestionsType} from "../components/RenderQuestion/types";

export interface infoTestTypes {
    testId: number;
    countQuestions: number;
    timer: number;
    currentStep: number;
    ended: boolean;
    data: (string | number | number[])[];
}

export interface TestsContextTypes extends Omit<TestsContextProviderProps, 'children'> {
    historyTests: infoTestTypes[];
    setHistoryTests: React.Dispatch<React.SetStateAction<infoTestTypes[]>>;
    testLast: infoTestTypes | null;
    countDoneTests: number;
    questions: QuestionsType[];
    percentDone: number;
}

export interface TestsContextProviderProps {
    children: React.ReactNode;
}