import { cn } from "@/lib/utils";
import { postState } from "@/store/currentPost";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useSetRecoilState } from "recoil";
import VoteAndComment from "./VoteAndComment";

export default function Card(item) {
  const setPost=useSetRecoilState(postState);

  return (
    <div onClick={()=>{setPost(item.date)}}>
      <div
        className={
          " min-w-300 flex flex-col items-start gap-2 rounded-lg p-3 text-left text-sm transition-all hover:bg-accent"
        }
      >
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{item.title}</div>
            </div>
            <div
              className={cn(
                "ml-auto text-xs min-w-10 ",
                // mail.selected === item.id
                //   ? "text-foreground"
                //   : "text-muted-foreground"
              )}
            >
              {formatDistanceToNow(new Date(item.date), {
                addSuffix: true,
              })}
            </div>
          </div>
          <div className="line-clamp-2 text-xs text-muted-foreground">
            {item.description}
          </div>
         <VoteAndComment date={item.date} className={""}/>
        </div>
      </div>
    </div>
  )
}