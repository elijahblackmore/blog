import { getPosts, groupPostsByYear } from "@/lib/posts";
import Article from "@/components/Article";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Scale } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const posts = getPosts();

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-x-2.5">
          <Scale
            size={18}
            className="text-light-icon-variant dark:text-dark-icon-variant"
          />
          <Link
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-medium text-light-heading underline decoration-light-underline underline-offset-[6px] dark:text-dark-heading dark:decoration-dark-underline"
          >
            CC BY-NC-SA 4.0
          </Link>
        </div>
        <ThemeSwitch />
      </section>
      <div className="mt-8 space-y-6">
        {Object.entries(groupPostsByYear(posts))
          .sort(([b], [a]) => Number(a) - Number(b))
          .map(([year, postsOfYear]) => (
            <div className="space-y-6 pt-8" key={year}>
              <h2 className="text-xl font-bold text-light-heading-variant dark:text-dark-heading-variant">
                {year}
              </h2>
              <ul className="space-y-6 md:space-y-6">
                {postsOfYear.map((post) => (
                  <li key={post.slug}>
                    <Article post={post} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </>
  );
}
