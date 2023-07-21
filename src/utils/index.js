import {faker} from "@faker-js/faker";
import {WORD_COUNT} from "../store/index.js";

export function getParagraph() {
	return faker.word.words({count: WORD_COUNT}) // 'almost'
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
