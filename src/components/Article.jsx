import Link from "next/link";
import { format } from "date-fns";

export default function Article({ post }) {
  return (
    <article className="flex flex-col justify-between gap-x-12 gap-y-2.5 md:flex-row md:gap-y-0">
      <Link href={post.slug}>
        <h3 className="text-xl font-bold text-light-heading dark:text-dark-heading">
          {post.title}
        </h3>
      </Link>
      <time
        className="text-nowrap font-mono text-sm leading-7 text-light-body dark:text-dark-body md:text-right"
        dateTime={post.date}
      >
        {format(post.date, "MMM dd")}
      </time>
    </article>
  );
}
