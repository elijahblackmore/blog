import { getPosts, groupPostsByYear } from "@/lib/posts";
import { Scale } from "lucide-react";
import Link from "next/link";
import Article from "@/components/Article";
import ThemeSwitch from "@/components/ThemeSwitch";

export default function Page() {
  const posts = getPosts();

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-x-2.5">
          <Scale size={18} className="text-light-icon dark:text-dark-icon" />
          <Link
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-medium text-light-body underline decoration-light-icon decoration-wavy underline-offset-4 dark:text-dark-heading dark:decoration-dark-icon"
          >
            CC BY-NC-SA 4.0
          </Link>
        </div>
        <ThemeSwitch />
        {/*
        <Link
          href="https://github.com/elijahblackmore/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm font-medium text-light-body underline decoration-light-underline decoration-wavy underline-offset-4 dark:text-dark-heading dark:decoration-dark-icon"
        >
          Source code
        </Link>
        */}
      </section>
      <div className="mt-8 space-y-6">
        {Object.entries(groupPostsByYear(posts))
          .sort(([b], [a]) => Number(a) - Number(b))
          .map(([year, postsOfYear]) => (
            <div className="space-y-4 pt-8 md:space-y-4">
              <h2 className="font-medium text-light-icon dark:text-dark-icon">
                {year}
              </h2>
              <div className="space-y-6 md:space-y-4">
                {postsOfYear.map((post) => (
                  <Article post={post} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
