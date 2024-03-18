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
