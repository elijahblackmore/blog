import { getPosts } from "@/lib/posts";
import { format } from "date-fns";
import { Scale } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const posts = getPosts();

  return (
    <main className="mt-2 space-y-12 pt-2">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-x-2.5">
          <Scale size={18} className="text-light-icon dark:text-dark-icon" />
          <Link
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-medium text-light-body underline decoration-light-underline decoration-wavy underline-offset-8 dark:text-dark-body dark:decoration-dark-underline"
          >
            CC BY-NC-SA 4.0
          </Link>
        </div>
        <Link
          href="https://github.com/elijahblackmore/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm font-medium text-light-body underline decoration-light-underline decoration-wavy underline-offset-8 dark:text-dark-body dark:decoration-dark-underline"
        >
          Source code
        </Link>
      </section>

      <div className="mt-20 space-y-8">
        {posts.map((post) => (
          <article className="justify-between gap-x-8 md:flex">
            <Link href={post.slug}>
              <h3 className="text-xl font-semibold sm:mt-0 dark:text-dark-heading">
                {post.title}
              </h3>
            </Link>

            <div className="flex">
              <time
                className="mt-2 font-mono text-sm leading-7 text-light-body md:mt-0 md:text-right dark:text-dark-body"
                dateTime={post.date}
              >
                {format(post.date, "dd/MM/yyyy")}
              </time>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
