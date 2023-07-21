import {faker} from "@faker-js/faker";
import {DIFFICULTIES, useGlobalState, WORD_COUNT} from "../store/index.js";
import {dataset} from "../constants/data.jsx";

export function getParagraph() {
	// return faker.paragraph(10, {
	// 	specialCharacters: true,
	// return faker.word.words({count: WORD_COUNT}); // 'almost'
	return dataset[DIFFICULTIES.EASY][random(5)];
}

export const calculateWPM = (
	typedParagraph,
	wrongChars,
	timeInSecs
) => {
	const minutes = timeInSecs / 60;
	const wordsTyped = typedParagraph.length / 5;
	const wrongWordsTyped = wrongChars / 5;
	const wpm = (wordsTyped - wrongWordsTyped) / minutes;
	return wpm > 0 ? wpm : 0;
};

export function random(max) {
	return Math.floor(Math.random() * max);
}
