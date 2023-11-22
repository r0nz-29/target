import {faker} from "@faker-js/faker";
import {DIFFICULTIES, useGlobalState, WORD_COUNT} from "../store/index.js";
import {dataset} from "../constants/data.jsx";

export function getParagraph() {
	// return faker.paragraph(10, {
	// 	specialCharacters: true,
	// return faker.word.words({count: WORD_COUNT}); // 'almost'
	return dataset[DIFFICULTIES.EASY][0];
}

export function getArrayFromMap(map) {
	const board = [];
	Object.keys(map).forEach(key => {
		const user = {};
		user.username = key;
		user.speed = map[key]?.speed;
		user.pos = map[key]?.pos;
		user.over = map[key]?.over;
		user.accuracy = map[key]?.accuracy;
		user.errors = map[key]?.errors;
		board.push(user);
	})
	return board;
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
	const res = Math.floor(Math.random() * max);
	if (res >= max) return max-1;
	else return res;
}
