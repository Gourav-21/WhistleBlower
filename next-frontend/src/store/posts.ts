import { atom } from "recoil";

export interface post{
    id:string,
    title:string,
    description:string,
    date:string,
    vote:number,
    comments:[
      {
        name:string,
        comment:string,
        date:string,
        vote:number
      }
    ]
}

export const defaultPost:post={
  id:'',
  title:'',
  description:'',
  date:'',
  vote:0,
  comments:[
      {
          name:'',
          comment:'',
          date:'',
          vote:0
      }
  ]
}

export const postsAtom = atom<post[]>({
    key: 'postsAtom',
    default: []
});