import { getPostBySlug, getPosts } from "@/lib/posts";
import "@/styles/markdown.css";
import ThemeSwitch from "@/components/ThemeSwitch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { compileMDX } from "next-mdx-remote/rsc";
import { rehypeGithubAlerts } from "rehype-github-alerts";
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
          [rehypeGithubAlerts],
        ],
      },
    },
  });

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="flex w-fit items-center gap-x-1.5 rounded-full border border-dashed border-[#B0A7C0] py-1 pl-1.5 pr-3 dark:border-dark-border"
        >
          <ChevronLeft
            size={18}
            strokeWidth={2.5}
            className="text-light-icon dark:text-dark-icon"
          />
          <span className="font-mono text-sm font-medium text-light-heading dark:text-dark-heading dark:decoration-dark-underline">
            Back
          </span>
        </Link>
        <ThemeSwitch />
      </div>

      <h1 className="pb-2.5 pt-2 text-2xl font-bold text-light-heading dark:text-dark-heading">
        {post.title}
      </h1>

      <time
        className="font-mono text-sm text-light-body dark:text-dark-body"
        dateTime={post.date}
      >
        Posted {format(post.date, "MMM dd, yyyy")}
      </time>
      <section className="prose prose-theme max-w-none pt-12 dark:prose-invert prose-a:decoration-light-underline dark:prose-a:decoration-dark-underline">
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
