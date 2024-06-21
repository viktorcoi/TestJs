export interface QuestionsType {
    "type": "simple" | "multiple" | "value" | "bigValue",
    "question": string,
    "options": string[],
    "answer": string | number[],
}