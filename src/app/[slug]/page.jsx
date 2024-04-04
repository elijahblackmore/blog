import { getPostBySlug, getPosts } from "@/lib/posts";
import "@/styles/markdown.css";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
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
    <main>
      <div className="flex items-center justify-between">
        <Link href="/" className="flex w-fit items-center gap-x-2.5">
          <ChevronLeft
            size={16}
            strokeWidth={3}
            className="text-light-icon dark:text-dark-icon"
          />
          <span className="font-mono text-sm font-medium text-light-body underline decoration-light-underline decoration-wavy underline-offset-8 dark:text-dark-body dark:decoration-dark-underline">
            Back to posts
          </span>
        </Link>
        <time
          className="w-24 font-mono text-sm font-medium leading-7 text-light-body md:mt-0 md:text-right dark:text-dark-body"
          dateTime={post.date}
        >
          {format(post.date, "d/MM/yyyy")}
        </time>
      </div>
      <h1 className="border-light-underline mb-0 mt-8 border-b-0 pb-4 text-2xl font-semibold text-light-heading dark:border-dark-underline dark:text-dark-heading">
        {post.title}
      </h1>
      <section className="prose prose-theme mb-20 max-w-none pt-4 dark:prose-invert prose-a:decoration-dark-underline dark:prose-a:decoration-dark-underline">
        {content}
      </section>
    </main>
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
