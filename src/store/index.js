import {create} from 'zustand'
import {getParagraph} from "../utils/index.js";

export const WORD_COUNT = 30;
export const SOLO_GAME_DURATION = 50;
export const DURATIONS = [25, 50, 75];
export const BACKSPACE = "Backspace"
export const DIFFICULTIES = {
	EASY: 'easy',
	MEDIUM: 'medium',
	HARD: 'hard'
}
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
	COMPLETED: 'completed'
}
export const GAMEMODES = {
	SOLO: 'solo',
	MULTIPLAYER: 'multiplayer'
}

export const useGlobalState = create((set) => ({
	originalParagraph: getParagraph(),
	activeDuration: DURATIONS[0],
	soloDifficulty: DIFFICULTIES.EASY,
	typedParagraph: "",
	cursorPosition: 0,
	errors: 0,
	findingRoom: false,
	roomName: '',
	roomMembers: {},
	waitingTimeout: -1,
	graph: [],
	errorPoints: [],
	gameState: GAMESTATES.IDLE,
	setRoomName: name => set(() => ({roomName: name})),
	setOriginalPara: para => set(() => ({originalParagraph: para})),
	setSoloDifficulty: diff => set(() => ({soloDifficulty: diff})),
	setActiveDuration: dur => set(() => ({activeDuration: dur})),
	setWaitingTimeout: time => set(() => ({waitingTimeout: time})),
	setRoomMembers: members => set(() => ({roomMembers: members})),
	incrementCursor: () => set(state => ({cursorPosition: state.cursorPosition + 1})),
	incrementErrors: () => set(state => ({errors: state.errors + 1})),
	updateGameState: (gameState) => set(() => ({gameState})),
	updateGraph: (newPoint) => set((state) => ({graph: [...state.graph, newPoint]})),
	updateErrorPoints: (newPoint) => set((state) => ({errorPoints: [...state.errorPoints, newPoint]})),
	setFindingRoom: (val) => set(() => ({findingRoom: val})),
	// decrementCursor: () => set(state => state.cursorPosition===0 ? state : ({cursorPosition: state.cursorPosition - 1})),
	updateTypedParagraph: (char) => set((state) => ({typedParagraph: state.typedParagraph + char})),
	hitBackspace: () => set(state => ({typedParagraph: state.typedParagraph.slice(0, -1)}))
}))
