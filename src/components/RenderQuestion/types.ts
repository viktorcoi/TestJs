export interface QuestionsType {
    "type": "simple" | "multiple" | "value" | "bigValue",
    "question": string,
    "options": string[] | null,
    "answer": string | number[] | null | number,
}