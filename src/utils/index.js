import {faker} from "@faker-js/faker";
import {WORD_COUNT} from "../store/index.js";

export function getParagraph() {
	return faker.word.words({count: WORD_COUNT}) // 'almost'
}

export const calculateAccuracy = (originalParagraph, typedParagraph) => {
	let correctChars = 0;
	for (let i = 0; i < typedParagraph.length; i++) {
		if (typedParagraph[i] === originalParagraph[i]) {
			correctChars++;
		}
	}

	const accuracyMetrics = {
		correctChars,
		incorrectChars: typedParagraph.length - correctChars,
		accuracy: (correctChars / typedParagraph.length) * 100,
	};

	return accuracyMetrics.accuracy;
};

export const calculateWPM = (
	typedParagraph,
	// accuracy,
	timeInMilliSecs
) => {
	const minutes = timeInMilliSecs / 1000;
	const wordsTyped = typedParagraph.length / 5;
	const grossWPM = wordsTyped / minutes;
	// const netWPM = Math.round(grossWPM * (accuracy / 100));
	//
	// const results = {
	// 	wpm: netWPM,
	// 	cpm: typedParagraph.length / minutes,
	// };
	return grossWPM;
};

export const calculateErrorPercentage = (accuracy) => {
	return 100 - accuracy;
};
