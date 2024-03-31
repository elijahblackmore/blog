import Link from "next/link";
import { formatDistanceStrict } from "date-fns";
import { getPosts } from "@/lib/posts";
import { Scale } from "lucide-react";

export default function Page() {
  const posts = getPosts();

  return (
    <main className="space-y-12">
      <div className="flex items-center gap-x-2">
        <Scale size={18} className="text-light-icon dark:text-dark-icon" />
        <Link
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          className="text-sm font-medium text-light-body underline decoration-light-underline underline-offset-4 dark:text-dark-body dark:decoration-dark-underline"
        >
          CC BY-NC-SA 4.0
        </Link>
      </div>
      {posts.map((post) => (
        <article>
          <time
            className="text-sm text-light-body dark:text-dark-body"
            dateTime={post.date}
          >
            Posted{" "}
            {formatDistanceStrict(post.date, new Date(), {
              addSuffix: true,
            })}
          </time>
          <Link href={post.slug}>
            <h3 className="mt-2 text-xl font-bold text-light-heading lg:text-xl dark:text-dark-heading">
              {post.title}
            </h3>
          </Link>
        </article>
      ))}
    </main>
  );
}
