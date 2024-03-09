import { atom, atomFamily } from "recoil";

export const Vote = atomFamily({
    key: 'voteing',
    default: date => localStorage.getItem(date),
});