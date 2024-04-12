import { getPostBySlug, getPosts } from "@/lib/posts";
import "@/styles/markdown.css";
import ThemeSwitch from "@/components/ThemeSwitch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

export default async function Post({ params }) {
  const post = getPostBySlug(params.slug);

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          [rehypeExternalLinks, { rel: ["nofollow"], target: ["_blank"] }],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                ariaLabel: "Link to subheading",
                className: ["subheading-anchor"],
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "catppuccin-mocha",
                light: "catppuccin-latte",
              },
            },
          ],
        ],
      },
    },
  });

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="flex w-fit items-center gap-x-2.5">
          <ChevronLeft
            size={18}
            strokeWidth={3}
            className="text-light-icon dark:text-dark-icon"
          />
          <span className="font-mono text-sm font-medium text-light-body underline decoration-light-icon decoration-wavy underline-offset-4 dark:text-dark-heading dark:decoration-dark-icon">
            Go back
          </span>
        </Link>
        <time
          className="hidden w-24 font-mono text-sm font-normal leading-7 text-light-body dark:text-dark-body md:mt-0 md:text-right"
          dateTime={post.date}
        >
          {format(post.date, "MMM dd yyyy")}
        </time>
        <ThemeSwitch />
      </div>

      <h1 className="border-b-0 border-light-underline pb-2.5 pt-2 text-2xl font-bold text-light-heading dark:border-dark-underline dark:text-dark-heading">
        {post.title}
      </h1>

      <time
        className="font-mono text-sm text-light-body dark:text-dark-body"
        dateTime={post.date}
      >
        Posted {format(post.date, "MMM dd, yyyy")}
      </time>
      <section className="prose prose-theme max-w-none pt-12 dark:prose-invert prose-a:decoration-light-icon dark:prose-a:decoration-dark-icon">
        {content}
      </section>
    </>
  );
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);

  return {
    title: `${post.title} | Elijah Blackmore`,
  };
}

export async function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
