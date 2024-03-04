import { cn } from "@/lib/utils";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function Card(item) {
  return (
    <div>
      <div
        className={
          "w-300 flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
        }
      >
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{item.title}</div>
            </div>
            <div
            className={cn(
              "ml-auto text-xs",
            //   mail.selected === item.id
            //     ? "text-foreground"
            //     : "text-muted-foreground"
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
          {/* {item.labels.length ? (
        <div className="flex items-center gap-2">
          {item.labels.map((label) => (
            <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
              {label}
            </Badge>
          ))}
        </div>
      ) : null} */}
        </div>
      </div>
    </div>
  )
}