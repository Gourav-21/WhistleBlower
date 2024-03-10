import { atom } from "recoil";

export const commentState = atom({
    key: 'commentState',
    default: [{
        _id:'',
        name:'',
        comment:'',
        date:'',
        vote:0
    }],
});