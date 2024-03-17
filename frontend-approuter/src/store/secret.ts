import { atom } from "recoil";

export const secret = atom({
    key: 'secret',
    default: {secretjs: null, address: null},
});