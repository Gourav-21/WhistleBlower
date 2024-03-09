import { atomFamily, selectorFamily } from "recoil";
import { postsAtom } from "./posts";

export const postAtomFamily = atomFamily({
    key: 'MyAtomFamily',
    default: selectorFamily({
        key: 'MyAtom/Default',
        get: date => ({get}) => {
          const otherAtomValue = get(postsAtom);
          return otherAtomValue.find(post=>post.date===date);
        },
    }),
})

export const commentsAtomFamily = atomFamily({
    key: 'MyAtomFamily',
    default: selectorFamily({
        key: 'MyAtom/Default',
        get: ({date,id}:{date:string,id:string}) => ({get}) => {
          const otherAtomValue = get(postsAtom);
          return otherAtomValue.find(post=>post.date===id).comments.find(comment=>comment.date===date);
        },
    }),
})
