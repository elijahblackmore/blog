import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { compileMDX } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import { getPosts, getPostBySlug } from "@/lib/posts";
import "@/styles/markdown.css";

export default async function Post({ params }) {
  const post = getPostBySlug(params.slug);

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
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
          <span className="font-mono text-sm font-medium text-light-body underline decoration-dark-underline decoration-wavy underline-offset-8 dark:text-dark-body">
            Back to posts
          </span>
        </Link>
        <time
          className="w-24 font-mono text-sm leading-7 text-light-body md:mt-0 md:text-right dark:text-dark-body"
          dateTime={post.date}
        >
          {format(post.date, "d/MM/yyyy")}
        </time>
      </div>
      <h1 className="mb-0 mt-8 text-2xl font-semibold text-light-heading dark:text-dark-heading">
        {post.title}
      </h1>
      <section className="prose prose-theme max-w-none pt-20 dark:prose-invert">
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
