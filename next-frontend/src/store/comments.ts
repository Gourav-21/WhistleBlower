import { atom } from "recoil";

export const commentState = atom({
    key: 'commentState',
    default: [{
        name:'',
        comment:'',
        date:'',
        vote:0
    }],
});