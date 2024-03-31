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
      <Link href="/" className="flex items-center gap-x-1.5">
        <ChevronLeft
          size={14}
          strokeWidth={3}
          className="text-light-icon dark:text-dark-icon"
        />
        <span className="text-sm font-medium text-light-body dark:text-dark-body">
          Back to posts
        </span>
      </Link>
      <h1 className="my-4 text-2xl font-extrabold text-light-heading dark:text-dark-heading">
        {post.title}
      </h1>
      <time
        className="text-sm text-light-body dark:text-dark-body"
        dateTime={post.date}
      >
        Posted on {format(post.date, `MMMM dd, yyyy`)}
      </time>
      <section className="prose prose-neutral pt-12 dark:prose-invert">
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
