import {create} from 'zustand'
import {getParagraph} from "../utils/index.js";

export const WORD_COUNT = 30;
export const BACKSPACE = "Backspace"
export const SPECIAL_KEYS = new Set([
	"Tab",
	"CapsLock",
	"Shift",
	"Control",
	"Alt",
	"ArrowLeft",
	"ArrowRight",
	"ArrowUp",
	"ArrowDown",
	"Enter",
	"Meta",
	"NumLock"
]);
export const GAMESTATES = {
	TYPING: 'typing',
	IDLE: 'idle',
}

export const useGlobalState = create((set) => ({
	originalParagraph: getParagraph(),
	typedParagraph: "",
	cursorPosition: 0,
	errors: 0,
	gameState: GAMESTATES.IDLE,
	incrementCursor: () => set(state => ({cursorPosition: state.cursorPosition + 1})),
	incrementErrors: () => set(state => ({errors: state.errors + 1})),
	// decrementCursor: () => set(state => state.cursorPosition===0 ? state : ({cursorPosition: state.cursorPosition - 1})),
	updateTypedParagraph: (char) => set((state) => ({typedParagraph: state.typedParagraph + char})),
	hitBackspace: () => set(state => ({typedParagraph: state.typedParagraph.slice(0, -1)}))
}))
